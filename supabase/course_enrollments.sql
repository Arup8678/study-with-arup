-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
create table if not exists public.course_enrollments (
  id          uuid primary key default gen_random_uuid(),
  course_id   text not null,
  name        text not null,
  phone       text not null,
  utr         text not null unique,          -- one UTR can only ever be used once
  amount      integer not null,
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists course_enrollments_phone_idx on public.course_enrollments (phone);

-- Lock the table: only the server (service-role key) can read/write it.
alter table public.course_enrollments enable row level security;
