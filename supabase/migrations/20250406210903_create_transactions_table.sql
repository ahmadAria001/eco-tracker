create table if not exists public.transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    amount numeric not null,
    description text,
    category text,
    created_at timestamp with time zone default now()
);

-- RLS
alter table public.transactions enable row level security;

create policy "Users can manage their own transactions"
on public.transactions
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
