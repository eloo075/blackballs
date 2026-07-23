import { MAX_BELIEVERS } from './constants';
import { getSupabase, isSupabaseConfigured } from './supabase';

export interface BelieverSubmission {
  wallet_address: string;
  x_username: string | null;
  created_at: string;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: 'invalid_wallet' | 'duplicate' | 'full' | 'network' | 'already_submitted' };

const STORAGE_KEY = 'blackballs_believers_v1';
const LOCAL_WALLET_KEY = 'blackballs_believer_wallet';

const EVM_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isValidWalletAddress(address: string): boolean {
  return EVM_WALLET_REGEX.test(address.trim());
}

function normalizeUsername(username: string): string | null {
  const trimmed = username.trim().replace(/^@/, '');
  return trimmed.length > 0 ? trimmed : null;
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

  const supabase = getSupabase();

  if (supabase) {
    const { count } = await supabase
      .from('believer_submissions')
      .select('*', { count: 'exact', head: true });

    if ((count ?? 0) >= MAX_BELIEVERS) {
      return { ok: false, error: 'full' };
    }

    const { error } = await supabase.from('believer_submissions').insert({
      wallet_address: walletTrimmed,
      x_username: username,
    });

    if (error) {
      if (error.code === '23505') return { ok: false, error: 'duplicate' };
      if (error.message.includes('500')) return { ok: false, error: 'full' };
      return { ok: false, error: 'network' };
    }

    setLocalSubmittedWallet(walletTrimmed);
    return { ok: true };
  }

  const submissions = readLocalSubmissions();
  if (submissions.length >= MAX_BELIEVERS) {
    return { ok: false, error: 'full' };
  }
  if (submissions.some((s) => s.wallet_address === walletTrimmed)) {
    return { ok: false, error: 'duplicate' };
  }

  submissions.push({
    wallet_address: walletTrimmed,
    x_username: username,
    created_at: new Date().toISOString(),
  });
  writeLocalSubmissions(submissions);
  setLocalSubmittedWallet(walletTrimmed);
  return { ok: true };
}

export function usingRemoteStorage(): boolean {
  return isSupabaseConfigured;
}
