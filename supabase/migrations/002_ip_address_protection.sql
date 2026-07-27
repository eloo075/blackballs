-- Add IP tracking and lock down direct client inserts (use /api/qualify with service role)

alter table public.believer_submissions
  add column if not exists ip_address text;

create unique index if not exists believer_submissions_ip_address_unique
  on public.believer_submissions (ip_address)
  where ip_address is not null;

-- Submissions must go through the secure API route (service role), not anon client inserts
drop policy if exists "Public insert under 500 limit" on public.believer_submissions;
