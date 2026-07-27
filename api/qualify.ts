import { createClient } from '@supabase/supabase-js';

const EVM_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const MAX_BELIEVERS = 500;

const BLOCKED_WALLETS = new Set([
  '0x0000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000001',
  '0x1111111111111111111111111111111111111111',
  '0x1234567890123456789012345678901234567890',
]);

function isValidWallet(address: string): boolean {
  const trimmed = address.trim();
  if (!EVM_WALLET_REGEX.test(trimmed)) return false;
  const lower = trimmed.toLowerCase();
  if (BLOCKED_WALLETS.has(lower)) return false;
  if (/^0x0+$/.test(lower) || /^0x1+$/.test(lower)) return false;
  if (/^0x1234[0]*$/.test(lower)) return false;
  return true;
}

function getClientIp(req: {
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) return realIp;
  return req.socket?.remoteAddress ?? 'unknown';
}

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: { wallet_address?: string; x_username?: string | null };
  socket?: { remoteAddress?: string };
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  const wallet = String(req.body?.wallet_address ?? '').trim();
  const rawUsername = req.body?.x_username;
  const xUsername =
    rawUsername && String(rawUsername).trim().length > 0
      ? String(rawUsername).trim().replace(/^@/, '')
      : null;

  if (!isValidWallet(wallet)) {
    return res.status(400).json({ ok: false, error: 'invalid_wallet' });
  }

  const ipAddress = getClientIp(req);
  const supabase = createClient(supabaseUrl, serviceKey);

  const { count, error: countError } = await supabase
    .from('believer_submissions')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    return res.status(500).json({ ok: false, error: 'network' });
  }

  if ((count ?? 0) >= MAX_BELIEVERS) {
    return res.status(400).json({ ok: false, error: 'full' });
  }

  const { data: ipMatch, error: ipError } = await supabase
    .from('believer_submissions')
    .select('id')
    .eq('ip_address', ipAddress)
    .maybeSingle();

  if (ipError) {
    return res.status(500).json({ ok: false, error: 'network' });
  }

  if (ipMatch) {
    return res.status(400).json({ ok: false, error: 'duplicate_ip' });
  }

  const { data: walletMatch, error: walletError } = await supabase
    .from('believer_submissions')
    .select('id')
    .eq('wallet_address', wallet)
    .maybeSingle();

  if (walletError) {
    return res.status(500).json({ ok: false, error: 'network' });
  }

  if (walletMatch) {
    return res.status(400).json({ ok: false, error: 'duplicate' });
  }

  const { error: insertError } = await supabase.from('believer_submissions').insert({
    wallet_address: wallet,
    x_username: xUsername,
    ip_address: ipAddress,
  });

  if (insertError) {
    if (insertError.code === '23505') {
      if (insertError.message.toLowerCase().includes('ip_address')) {
        return res.status(400).json({ ok: false, error: 'duplicate_ip' });
      }
      return res.status(400).json({ ok: false, error: 'duplicate' });
    }
    return res.status(500).json({ ok: false, error: 'network' });
  }

  return res.status(200).json({ ok: true });
}
