-- Ensure the newsletter_subscribers table exists with a robust schema
create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    email text not null unique
);

-- Enable RLS and add basic policy
alter table public.newsletter_subscribers enable row level security;
create policy "Enable insert for all users" on public.newsletter_subscribers for insert with check (true);

-- Clean up leads table source constraint to revert to original ('contact', 'audit')
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check check (source in ('contact', 'audit'));
