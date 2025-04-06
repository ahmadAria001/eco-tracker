alter table public.transactions
    alter column category drop default,
alter column category type transaction_category
  using category::transaction_category;