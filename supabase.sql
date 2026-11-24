-- =====================================================================
-- Tez Kömek — Supabase схемасы
-- Supabase → SQL Editor → New query → осы файлды толық қойып → Run
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Кестелер ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  email       text,
  full_name   text default '',
  role        text check (role in ('teacher','school','college','university','master','phd')),
  phone       text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  title_kk    text not null,
  title_ru    text,
  desc_kk     text,
  desc_ru     text,
  kind        text not null default 'presentation'
              check (kind in ('presentation','essay','lesson','other')),
  subject     text,
  levels      text[] not null default '{}',
  price       integer not null default 0 check (price >= 0),
  pages       integer,
  cover_url   text,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Жабық мазмұн: тек төлегендер мен админ көреді
create table if not exists public.product_content (
  product_id  uuid primary key references public.products on delete cascade,
  link_url    text,
  file_path   text
);

create table if not exists public.purchases (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles on delete cascade,
  product_id  uuid not null references public.products on delete cascade,
  status      text not null default 'pending' check (status in ('pending','paid','rejected')),
  payer_note  text,
  created_at  timestamptz not null default now(),
  paid_at     timestamptz,
  unique (user_id, product_id)
);

-- ---------- Көмекші функциялар ----------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false)
$$;

-- Жаңа тіркелген адамға профиль автоматты түрде жасалады
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Ешкім өзін-өзі админ ете алмайды (SQL Editor-дан ғана болады)
create or replace function public.protect_admin_flag() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.is_admin is distinct from old.is_admin
     and auth.uid() is not null and not public.is_admin() then
    new.is_admin := old.is_admin;
  end if;
  return new;
end $$;

drop trigger if exists protect_admin on public.profiles;
create trigger protect_admin before update on public.profiles
  for each row execute function public.protect_admin_flag();

-- Төленді деп белгіленгенде уақыты жазылады
create or replace function public.stamp_paid() returns trigger
language plpgsql as $$
begin
  if new.status = 'paid' and (old.status is distinct from 'paid') then new.paid_at := now(); end if;
  return new;
end $$;

drop trigger if exists purchases_paid on public.purchases;
create trigger purchases_paid before update on public.purchases
  for each row execute function public.stamp_paid();

-- ---------- Тапсырыстар ----------
create table if not exists public.orders (
  id          uuid primary key default gen_random_uuid(),
  num         bigint generated always as identity,
  user_id     uuid not null default auth.uid() references public.profiles on delete cascade,
  item        text not null,
  qty         integer not null default 1 check (qty between 1 and 500),
  urgent      boolean not null default false,
  promo_code  text,
  total       integer not null check (total >= 0),
  status      text not null default 'new' check (status in ('new','in_work','done','cancelled')),
  created_at  timestamptz not null default now()
);

-- Промокод тек алғашқы тапсырысқа; клиент тек өз атынан, тек «жаңа» күйде тапсырыс бере алады
create or replace function public.check_order() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    if new.user_id is distinct from auth.uid() then raise exception 'NOT_ALLOWED'; end if;
    new.status := 'new';
  end if;
  if new.promo_code is not null and exists (
       select 1 from public.orders o where o.user_id = new.user_id and o.status <> 'cancelled') then
    raise exception 'PROMO_FIRST_ONLY';
  end if;
  return new;
end $$;

drop trigger if exists orders_check on public.orders;
create trigger orders_check before insert on public.orders
  for each row execute function public.check_order();

-- ---------- Қауіпсіздік (RLS) ----------
alter table public.profiles        enable row level security;
alter table public.products        enable row level security;
alter table public.product_content enable row level security;
alter table public.purchases       enable row level security;

drop policy if exists "profiles read"   on public.profiles;
drop policy if exists "profiles update" on public.profiles;
create policy "profiles read"   on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles update" on public.profiles for update using (id = auth.uid() or public.is_admin());

drop policy if exists "products read"  on public.products;
drop policy if exists "products admin" on public.products;
create policy "products read"  on public.products for select using (
  published or public.is_admin() or exists (
    select 1 from public.purchases p where p.product_id = products.id and p.user_id = auth.uid()));
create policy "products admin" on public.products for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "content read"  on public.product_content;
drop policy if exists "content admin" on public.product_content;
create policy "content read" on public.product_content for select using (
  public.is_admin() or exists (
    select 1 from public.purchases p
    where p.product_id = product_content.product_id and p.user_id = auth.uid() and p.status = 'paid'));
create policy "content admin" on public.product_content for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "purchases read"   on public.purchases;
drop policy if exists "purchases insert" on public.purchases;
drop policy if exists "purchases admin"  on public.purchases;
create policy "purchases read"   on public.purchases for select using (user_id = auth.uid() or public.is_admin());
create policy "purchases insert" on public.purchases for insert
  with check ((user_id = auth.uid() and status = 'pending' and paid_at is null) or public.is_admin());
create policy "purchases admin"  on public.purchases for all using (public.is_admin()) with check (public.is_admin());

alter table public.orders enable row level security;
drop policy if exists "orders read"   on public.orders;
drop policy if exists "orders insert" on public.orders;
drop policy if exists "orders admin"  on public.orders;
create policy "orders read"   on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "orders insert" on public.orders for insert with check (user_id = auth.uid() or public.is_admin());
create policy "orders admin"  on public.orders for all using (public.is_admin()) with check (public.is_admin());

-- ---------- Файл қоймасы ----------
insert into storage.buckets (id, name, public) values ('covers', 'covers', true)  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('works',  'works',  false) on conflict (id) do nothing;

drop policy if exists "covers read"  on storage.objects;
drop policy if exists "admin files"  on storage.objects;
drop policy if exists "works read"   on storage.objects;
create policy "covers read" on storage.objects for select using (bucket_id = 'covers');
create policy "admin files" on storage.objects for all
  using (bucket_id in ('covers','works') and public.is_admin())
  with check (bucket_id in ('covers','works') and public.is_admin());
create policy "works read" on storage.objects for select using (
  bucket_id = 'works' and exists (
    select 1 from public.product_content pc
    join public.purchases p on p.product_id = pc.product_id
    where pc.file_path = storage.objects.name and p.user_id = auth.uid() and p.status = 'paid'));

-- =====================================================================
-- Сайтқа өз email-іңізбен тіркелгеннен кейін, өзіңізді админ ету үшін
-- төмендегі жолды (email-ді ауыстырып) бөлек іске қосыңыз:
--
--   update public.profiles set is_admin = true where email = 'сіздің@email.kz';
-- =====================================================================
