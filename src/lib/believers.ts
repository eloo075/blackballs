import { MAX_BELIEVERS } from './constants';
import { getSupabase, isSupabaseConfigured } from './supabase';

export interface BelieverSubmission {
  wallet_address: string;
  x_username: string | null;
  ip_address?: string | null;
  created_at: string;
}

export type SubmitResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | 'invalid_wallet'
        | 'duplicate'
        | 'duplicate_ip'
        | 'full'
        | 'network'
        | 'already_submitted'
        | 'server_misconfigured';
    };

const STORAGE_KEY = 'blackballs_believers_v1';
const LOCAL_WALLET_KEY = 'blackballs_believer_wallet';
const LOCAL_IP_KEY = 'blackballs_believer_ip_demo';

const EVM_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;

const BLOCKED_WALLETS = new Set([
  '0x0000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000001',
  '0x1111111111111111111111111111111111111111',
  '0x1234567890123456789012345678901234567890',
]);

function isDummyWallet(address: string): boolean {
  const lower = address.toLowerCase();
  if (BLOCKED_WALLETS.has(lower)) return true;
  if (/^0x0+$/.test(lower) || /^0x1+$/.test(lower)) return true;
  if (/^0x1234[0]*$/.test(lower)) return true;
  return false;
}

export function isValidWalletAddress(address: string): boolean {
  const trimmed = address.trim();
  if (!EVM_WALLET_REGEX.test(trimmed)) return false;
  if (isDummyWallet(trimmed)) return false;
  return true;
}

function normalizeUsername(username: string): string | null {
  const trimmed = username.trim().replace(/^@/, '');
  return trimmed.length > 0 ? trimmed : null;
}

function qualifyApiUrl(): string {
  return import.meta.env.VITE_QUALIFY_API_URL ?? '/api/qualify';
}

function readLocalSubmissions(): BelieverSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BelieverSubmission[]) : [];
  } catch {
    return [];
  }
}

function writeLocalSubmissions(submissions: BelieverSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function getLocalSubmittedWallet(): string | null {
  return localStorage.getItem(LOCAL_WALLET_KEY);
}

export function setLocalSubmittedWallet(wallet: string) {
  localStorage.setItem(LOCAL_WALLET_KEY, wallet);
}

export async function getSubmissionCount(): Promise<number> {
  const supabase = getSupabase();
  if (supabase) {
    const { count, error } = await supabase
      .from('believer_submissions')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count ?? 0;
  }
  return readLocalSubmissions().length;
}

type ApiError =
  | 'invalid_wallet'
  | 'duplicate'
  | 'duplicate_ip'
  | 'full'
  | 'network'
  | 'server_misconfigured'
  | 'method_not_allowed';

async function submitViaApi(
  wallet: string,
  xUsername: string | null
): Promise<SubmitResult> {
  try {
    const response = await fetch(qualifyApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet_address: wallet,
        x_username: xUsername,
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: ApiError };

    if (response.ok && payload.ok) {
      setLocalSubmittedWallet(wallet);
      return { ok: true };
    }

    if (payload.error && payload.error !== 'method_not_allowed') {
      return { ok: false, error: payload.error };
    }

    return { ok: false, error: 'network' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

export async function submitBeliever(
  wallet: string,
  xUsername?: string
): Promise<SubmitResult> {
  const walletTrimmed = wallet.trim();
  const username = normalizeUsername(xUsername ?? '');

  if (!isValidWalletAddress(walletTrimmed)) {
    return { ok: false, error: 'invalid_wallet' };
  }

  const existingLocal = getLocalSubmittedWallet();
  if (existingLocal === walletTrimmed) {
    return { ok: true };
  }

  if (isSupabaseConfigured) {
    return submitViaApi(walletTrimmed, username);
  }

  const submissions = readLocalSubmissions();
  if (submissions.length >= MAX_BELIEVERS) {
    return { ok: false, error: 'full' };
  }
  if (submissions.some((s) => s.wallet_address === walletTrimmed)) {
    return { ok: false, error: 'duplicate' };
  }

  const demoIp = localStorage.getItem(LOCAL_IP_KEY) ?? 'demo-ip-local';
  if (submissions.some((s) => s.ip_address === demoIp)) {
    return { ok: false, error: 'duplicate_ip' };
  }
  localStorage.setItem(LOCAL_IP_KEY, demoIp);

  submissions.push({
    wallet_address: walletTrimmed,
    x_username: username,
    ip_address: demoIp,
    created_at: new Date().toISOString(),
  });
  writeLocalSubmissions(submissions);
  setLocalSubmittedWallet(walletTrimmed);
  return { ok: true };
}

export function usingRemoteStorage(): boolean {
  return isSupabaseConfigured;
}
