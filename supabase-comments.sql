-- Panduan komentar Synergos.Web (Supabase, gratis)
-- 1) Buat project di supabase.com
-- 2) Buka SQL Editor, tempel isi file ini, lalu klik Run
-- 3) Buka Project Settings > API, salin "Project URL" dan "anon public key" ke COMMENTS di js/data.js
-- Komentar baru TIDAK langsung tampil. Setujui di Table Editor > comments dengan mencentang kolom "approved".

create table public.comments (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  message text not null check (char_length(message) between 1 and 500),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

-- pengunjung hanya bisa MEMBACA komentar yang sudah disetujui
create policy "baca komentar disetujui" on public.comments
  for select using (approved = true);

-- pengunjung bisa MENGIRIM komentar, tetapi tidak bisa menyetujuinya sendiri
create policy "kirim komentar" on public.comments
  for insert with check (approved = false);
