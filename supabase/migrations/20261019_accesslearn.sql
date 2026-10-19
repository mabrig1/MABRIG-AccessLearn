-- AccessLearn prototype institutional storage, optional until live teacher/student accounts exist.
-- Run once in a dedicated Supabase project. Do not expose the service role key.
create extension if not exists pgcrypto;
create table if not exists public.learning_packs (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 150),
  source_text text not null,
  approved_content jsonb not null,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  published_at timestamptz,
  constraint publication_has_date check(status='draft' or published_at is not null)
);
create index if not exists learning_packs_teacher_idx on public.learning_packs(teacher_id);
create table if not exists public.learning_access (
  pack_id uuid not null references public.learning_packs(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(pack_id,student_id)
);
create index if not exists learning_access_student_idx on public.learning_access(student_id);
create table if not exists public.lesson_completion (
  pack_id uuid not null,
  student_id uuid not null,
  completed_at timestamptz not null default now(),
  primary key(pack_id,student_id),
  foreign key(pack_id,student_id) references public.learning_access(pack_id,student_id) on delete cascade
);
alter table public.learning_packs enable row level security;
alter table public.learning_access enable row level security;
alter table public.lesson_completion enable row level security;

-- SECURITY DEFINER helpers break the cross-table RLS recursion safely.
create or replace function public.is_pack_owner(p_pack_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.learning_packs p where p.id = p_pack_id and p.teacher_id = (select auth.uid()));
$$;
create or replace function public.is_published_pack_owner(p_pack_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.learning_packs p where p.id = p_pack_id and p.teacher_id = (select auth.uid()) and p.status = 'published');
$$;
revoke all on function public.is_pack_owner(uuid) from public;
revoke all on function public.is_published_pack_owner(uuid) from public;
grant execute on function public.is_pack_owner(uuid) to authenticated;
grant execute on function public.is_published_pack_owner(uuid) to authenticated;

create policy "teachers read own or enrolled learners read published packs" on public.learning_packs
  for select to authenticated using (
    teacher_id=(select auth.uid())
    or (status='published' and exists(select 1 from public.learning_access a where a.pack_id=id and a.student_id=(select auth.uid())))
  );
create policy "teachers add own packs" on public.learning_packs
  for insert to authenticated with check(teacher_id=(select auth.uid()));
create policy "teachers change own packs" on public.learning_packs
  for update to authenticated using(teacher_id=(select auth.uid())) with check(teacher_id=(select auth.uid()));
create policy "teachers remove own packs" on public.learning_packs
  for delete to authenticated using(teacher_id=(select auth.uid()));

create policy "teachers and enrolled learners view class access" on public.learning_access
  for select to authenticated using(student_id=(select auth.uid()) or public.is_pack_owner(pack_id));
create policy "teachers grant access to own published material" on public.learning_access
  for insert to authenticated with check(public.is_published_pack_owner(pack_id));
create policy "teachers revoke access to own materials" on public.learning_access
  for delete to authenticated using(public.is_pack_owner(pack_id));

create policy "student or teacher can read completion" on public.lesson_completion
  for select to authenticated using(student_id=(select auth.uid()) or public.is_pack_owner(pack_id));
create policy "students can mark their own lessons complete" on public.lesson_completion
  for insert to authenticated with check(student_id=(select auth.uid()) and exists(select 1 from public.learning_access a where a.pack_id=pack_id and a.student_id=(select auth.uid())));

-- Note: the browser prototype currently uses device storage. Connecting these tables
-- requires completing institutional invitations, enrolment UX, consent and RLS testing.
