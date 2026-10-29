-- THREADS & CULTURE schema
-- Apply in the Supabase SQL editor or via the CLI.
-- Row Level Security is enabled. Do not disable it in production.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  country text not null default 'Nigeria',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  description text,
  image_url text
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sku text unique not null,
  name text not null,
  short_description text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2),
  category_slug text references public.categories(slug),
  collection text,
  gender text,
  fabrics text[],
  care text[],
  tags text[],
  featured boolean not null default false,
  bestseller boolean not null default false,
  new_arrival boolean not null default false,
  in_stock boolean not null default true,
  allows_custom boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  src text not null,
  alt text not null,
  sort_order int not null default 0
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color text,
  size text,
  sku text,
  unique (product_id, color, size)
);

create table if not exists public.inventory (
  variant_id uuid primary key references public.product_variants(id) on delete cascade,
  quantity int not null default 0 check (quantity >= 0)
);

create table if not exists public.wishlists (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id),
  variant_id uuid references public.product_variants(id),
  quantity int not null check (quantity > 0),
  fit text not null default 'standard',
  created_at timestamptz not null default now()
);

create table if not exists public.discount_codes (
  code text primary key,
  type text not null check (type in ('percent', 'fixed')),
  value numeric(12,2) not null,
  min_subtotal numeric(12,2),
  active boolean not null default true,
  description text
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  user_id uuid references public.profiles(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  address jsonb not null,
  subtotal numeric(12,2) not null,
  discount numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  discount_code text,
  notes text,
  payment_method text not null,
  payment_status text not null default 'unpaid',
  status text not null default 'pending_payment',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid,
  name text not null,
  slug text,
  image text,
  quantity int not null,
  unit_price numeric(12,2) not null,
  color text,
  size text,
  fit text
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  reference text unique not null,
  amount numeric(12,2) not null,
  status text not null,
  raw jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tailoring_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  payload jsonb not null,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table if not exists public.body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  gender text not null,
  garment text not null,
  unit text not null,
  values jsonb not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  type text not null,
  preferred_date date not null,
  preferred_time text not null,
  name text not null,
  email text not null,
  phone text not null,
  notes text,
  status text not null default 'request_received',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_reference_idx on public.orders (reference);
create index if not exists payments_reference_idx on public.payments (reference);
create index if not exists products_category_idx on public.products (category_slug);
create index if not exists measurements_user_idx on public.body_measurements (user_id);

alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.inventory enable row level security;
alter table public.wishlists enable row level security;
alter table public.cart_items enable row level security;
alter table public.discount_codes enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.tailoring_requests enable row level security;
alter table public.body_measurements enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "public read categories" on public.categories for select using (true);
create policy "admin write categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "public read products" on public.products for select using (true);
create policy "admin write products" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "public read product images" on public.product_images for select using (true);
create policy "admin write product images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());

create policy "public read variants" on public.product_variants for select using (true);
create policy "admin write variants" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());

create policy "public read inventory" on public.inventory for select using (true);
create policy "admin write inventory" on public.inventory for all using (public.is_admin()) with check (public.is_admin());

create policy "public read discounts" on public.discount_codes for select using (active = true);
create policy "admin write discounts" on public.discount_codes for all using (public.is_admin()) with check (public.is_admin());

create policy "own profile" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "own addresses" on public.addresses
  for all using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "own wishlist" on public.wishlists
  for all using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "own cart" on public.cart_items
  for all using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "own orders" on public.orders
  for select using (auth.uid() = user_id or public.is_admin());
create policy "admin update orders" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

create policy "own order items" on public.order_items
  for select using (
    public.is_admin() or exists (
      select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
    )
  );

create policy "admin payments" on public.payments
  for select using (public.is_admin());

create policy "own tailoring" on public.tailoring_requests
  for select using (auth.uid() = user_id or public.is_admin());
create policy "insert own tailoring" on public.tailoring_requests
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "own measurements" on public.body_measurements
  for all using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "own appointments" on public.appointment_requests
  for select using (auth.uid() = user_id or public.is_admin() or email = (select email from auth.users where id = auth.uid()));
create policy "insert appointments" on public.appointment_requests
  for insert with check (true);

create policy "admin contact" on public.contact_messages
  for select using (public.is_admin());
create policy "insert contact" on public.contact_messages
  for insert with check (true);

create policy "insert newsletter" on public.newsletter_subscribers
  for insert with check (true);
create policy "admin newsletter" on public.newsletter_subscribers
  for select using (public.is_admin());

-- Storage: create a private bucket named `references` in the dashboard.
-- Suggested policy (run after the bucket exists):
-- create policy "own reference uploads" on storage.objects
--   for insert with check (bucket_id = 'references' and auth.uid() is not null);
-- create policy "read own references" on storage.objects
--   for select using (bucket_id = 'references' and owner = auth.uid() or public.is_admin());
