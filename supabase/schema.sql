-- Kosh public beta schema
-- Run in the Supabase SQL editor after enabling Supabase Auth.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null,
  age integer,
  phone text,
  gender text,
  location text,
  consent_given boolean default false,
  referral_code text,
  level_assigned integer,
  grey_zone_flagged boolean default false,
  grey_zone_exposure text[] default '{}',
  created_at timestamptz default now(),
  institution text,
  institution_type text check (institution_type in ('university', 'college', 'school', 'company', 'other') or institution_type is null),
  occupation text check (occupation in ('student', 'professional', 'business_owner', 'freelancer', 'other') or occupation is null),
  division text,
  district text,
  bio text,
  kyc_submitted boolean default false,
  kyc_status text default 'not_submitted' check (kyc_status in ('not_submitted', 'pending', 'verified', 'rejected')),
  nid_last4 text,
  kyc_submitted_at timestamptz
);

create table if not exists diagnostic_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scores jsonb not null,
  level integer not null,
  personality_label text not null,
  grey_zone boolean default false,
  grey_zone_exposures text[] default '{}',
  responses jsonb default '[]',
  completed_at timestamptz default now(),
  unique(user_id)
);

create table if not exists module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  status text not null default 'not_started',
  started_at timestamptz,
  completed_at timestamptz,
  time_spent_seconds integer default 0,
  quiz_score integer default 0,
  quiz_responses jsonb default '{}',
  action_completed boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, module_id)
);

create table if not exists tool_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tool_name text not null,
  used_at timestamptz default now()
);

alter table profiles enable row level security;
alter table diagnostic_results enable row level security;
alter table module_progress enable row level security;
alter table tool_usage enable row level security;

drop policy if exists "profiles own read" on profiles;
drop policy if exists "profiles own insert" on profiles;
drop policy if exists "profiles own update" on profiles;
drop policy if exists "diagnostic own read" on diagnostic_results;
drop policy if exists "diagnostic own insert" on diagnostic_results;
drop policy if exists "diagnostic own update" on diagnostic_results;
drop policy if exists "module progress own read" on module_progress;
drop policy if exists "module progress own insert" on module_progress;
drop policy if exists "module progress own update" on module_progress;
drop policy if exists "tool usage own insert" on tool_usage;

create policy "profiles own read" on profiles for select using (auth.uid() = id);
create policy "profiles own insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles own update" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "diagnostic own read" on diagnostic_results for select using (auth.uid() = user_id);
create policy "diagnostic own insert" on diagnostic_results for insert with check (auth.uid() = user_id);
create policy "diagnostic own update" on diagnostic_results for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "module progress own read" on module_progress for select using (auth.uid() = user_id);
create policy "module progress own insert" on module_progress for insert with check (auth.uid() = user_id);
create policy "module progress own update" on module_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "tool usage own insert" on tool_usage for insert with check (auth.uid() = user_id);
