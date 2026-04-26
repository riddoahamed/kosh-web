-- Run this in Supabase SQL editor: https://supabase.com/dashboard/project/uitdqikuodlrhrfjcnsz/sql

-- Profiles
create table if not exists profiles (
  id uuid primary key,
  name text not null,
  phone text not null,
  gender text,
  location text,
  consent_given boolean default false,
  referral_code text,
  level_assigned integer,
  grey_zone_flagged boolean default false,
  grey_zone_exposure text[] default '{}',
  created_at timestamptz default now()
);

-- Diagnostic sessions
create table if not exists diagnostic_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  scores jsonb not null,
  level integer not null,
  personality_label text not null,
  grey_zone jsonb,
  responses jsonb,
  completed_at timestamptz default now()
);

-- Module progress (one row per profile+module, upserted on each save)
create table if not exists user_module_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  module_id text not null,
  status text not null default 'not_started',
  started_at timestamptz,
  completed_at timestamptz,
  time_spent_seconds integer default 0,
  quiz_score integer default 0,
  quiz_responses jsonb default '{}',
  action_completed boolean default false,
  unique(profile_id, module_id)
);

-- RLS: allow all operations from the client (MVP — tighten before public launch)
alter table profiles enable row level security;
alter table diagnostic_sessions enable row level security;
alter table user_module_progress enable row level security;

create policy "allow all" on profiles for all using (true) with check (true);
create policy "allow all" on diagnostic_sessions for all using (true) with check (true);
create policy "allow all" on user_module_progress for all using (true) with check (true);
