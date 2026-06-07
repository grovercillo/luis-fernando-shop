-- Productos
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  description text,
  price_cents integer not null,
  stock integer not null default 0,
  images text[] default '{}',
  tags text[] default '{}',
  weight_grams integer,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Pedidos
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  status text not null default 'pending',
  stripe_payment_id text,
  total_cents integer not null,
  shipping_cost_cents integer not null default 0,
  shipping_address jsonb not null,
  created_at timestamptz not null default now()
);

-- Líneas de pedido
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders on delete cascade,
  product_id uuid not null references products on delete restrict,
  quantity integer not null,
  unit_price_cents integer not null
);

-- Índices útiles
create index on orders (status);
create index on orders (user_id);
create index on order_items (order_id);

-- Row Level Security
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Productos: lectura pública, escritura solo admin
create policy "productos_lectura_publica"
  on products for select
  using (active = true);

-- Pedidos: cada usuario ve solo los suyos
create policy "pedidos_propios"
  on orders for select
  using (auth.uid() = user_id);

create policy "pedidos_insertar"
  on orders for insert
  with check (true);

create policy "order_items_propios"
  on order_items for select
  using (
    order_id in (
      select id from orders where user_id = auth.uid()
    )
  );

create policy "order_items_insertar"
  on order_items for insert
  with check (true);

-- Datos iniciales: los 3 productos
insert into products (slug, name, brand, description, price_cents, stock, tags, weight_grams) values
(
  'aceite-emporium-trio',
  'Pack Trío AOVE',
  'Regere Emporium',
  'Tres aceites de oliva virgen extra de la comarca de Puente Genil. Selecto (Hojiblanco frutado intenso), Envero (frutado medio) y Ecológico (frutado verde). El aceite de Puente Genil lleva el título Optimi Olei Emporium desde 1935, único en España.',
  3000,
  20,
  '{"pack-regalo","aove","ecologico"}',
  1800
),
(
  'membrillo-lata-vintage',
  'Lata vintage con 2 tarrinas',
  'La Membrillera',
  'Carne de membrillo elaborada con la variedad wranja, exclusiva de Puente Genil. Más de 60 años de tradición de la familia Carvajal. Lata coleccionable con ilustración vintage andaluza.',
  1100,
  30,
  '{"membrillo","sin-gluten","artesanal"}',
  600
),
(
  'aceitunas-lanzas',
  'Aceitunas chupa-dedos',
  'Lanzas',
  'Aceitunas de mesa artesanales aliñadas. 1,2 kg. Elaboradas por AC. Lanzas S.L. en el corazón de Puente Genil. Sin gluten.',
  600,
  50,
  '{"aceitunas","sin-gluten","artesanal"}',
  1400
);