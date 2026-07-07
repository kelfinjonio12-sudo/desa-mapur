-- =========================================
-- SKEMA DATABASE SUPABASE: WEBSITE DESA MAPUR
-- Jalankan semua ini di Supabase SQL Editor
-- =========================================

create table sejarah (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  konten text not null,
  urutan int default 0,
  gambar text,
  created_at timestamptz default now()
);

create table kepercayaan (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  konten text not null,
  kategori text,
  gambar text,
  created_at timestamptz default now()
);

create table karya_seni (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  konten text not null,
  kategori text,
  harga_mulai text,
  gambar text,
  created_at timestamptz default now()
);

create table wisata (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  deskripsi text not null,
  lokasi text,
  harga_mulai text,
  kontak text,
  gambar text,
  created_at timestamptz default now()
);

create table galeri (
  id uuid primary key default gen_random_uuid(),
  judul text,
  url_media text not null,
  tipe text check (tipe in ('foto', 'video')) default 'foto',
  created_at timestamptz default now()
);

create table profil_desa (
  id text primary key default 'utama',
  nama_desa text,
  kecamatan text,
  kabupaten text,
  provinsi text,
  jumlah_penduduk text,
  deskripsi_singkat text,
  kontak_pemerintah text,
  updated_at timestamptz default now()
);

-- =========================================
-- ROW LEVEL SECURITY
-- Publik boleh baca semua, hanya user login yang boleh tulis
-- =========================================
alter table sejarah enable row level security;
alter table kepercayaan enable row level security;
alter table karya_seni enable row level security;
alter table wisata enable row level security;
alter table galeri enable row level security;
alter table profil_desa enable row level security;

create policy "public_read_sejarah" on sejarah for select using (true);
create policy "public_read_kepercayaan" on kepercayaan for select using (true);
create policy "public_read_karya_seni" on karya_seni for select using (true);
create policy "public_read_wisata" on wisata for select using (true);
create policy "public_read_galeri" on galeri for select using (true);
create policy "public_read_profil" on profil_desa for select using (true);

create policy "admin_write_sejarah" on sejarah for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_write_kepercayaan" on kepercayaan for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_write_karya_seni" on karya_seni for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_write_wisata" on wisata for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_write_galeri" on galeri for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin_write_profil" on profil_desa for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- =========================================
-- STORAGE BUCKET (jalankan lewat dashboard Supabase, menu Storage)
-- 1. Buat bucket baru bernama: desa-mapur-media
-- 2. Set "Public bucket" = ON (supaya gambar bisa diakses publik)
-- 3. Lalu jalankan policy di bawah ini di SQL Editor
-- =========================================
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'desa-mapur-media');

create policy "admin_upload_media" on storage.objects
  for insert with check (bucket_id = 'desa-mapur-media' and auth.uid() is not null);

create policy "admin_delete_media" on storage.objects
  for delete using (bucket_id = 'desa-mapur-media' and auth.uid() is not null);
