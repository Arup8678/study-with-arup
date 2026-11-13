-- Run once AFTER course_enrollments.sql: Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Links each course enrollment to the student's login account.
alter table public.course_enrollments add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.course_enrollments add column if not exists email text;
create index if not exists course_enrollments_user_idx on public.course_enrollments (user_id);
