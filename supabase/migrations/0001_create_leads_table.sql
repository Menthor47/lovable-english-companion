create extension if not exists pgcrypto;

create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    source text not null check (source in ('contact', 'audit')),
    email text not null,
    website text,
    message text,
    origin text,
    ip text,
    user_agent text,
    referer text
);

alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_source_idx on public.leads (source);
