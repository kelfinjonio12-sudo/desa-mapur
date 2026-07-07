import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil Desa Mapur | Kecamatan Riau Silip, Kabupaten Bangka',
  description:
    'Informasi resmi Desa Mapur: wilayah administratif, data kependudukan, dan kontak pemerintah desa di Kecamatan Riau Silip, Kabupaten Bangka, Kepulauan Bangka Belitung.',
};

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return children;
}