-- Run this in your Supabase SQL editor to enable shared submission storage

create table if not exists public.believer_submissions (
  id uuid primary key default gen_random_uuid(),
  wallet_address text not null unique,
  x_username text,
  created_at timestamptz not null default now()
);

create index if not exists believer_submissions_created_at_idx
  on public.believer_submissions (created_at);

alter table public.believer_submissions enable row level security;

-- Anyone can read submissions (for count display)
create policy "Public read believer submissions"
  on public.believer_submissions
  for select
  using (true);

-- Insert only while under 500 total rows
create policy "Public insert under 500 limit"
  on public.believer_submissions
  for insert
  with check (
    (select count(*) from public.believer_submissions) < 500
  );
