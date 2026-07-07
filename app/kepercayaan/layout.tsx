import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kepercayaan & Adat Istiadat Suku Lom | Desa Mapur',
  description:
    'Memahami filosofi hidup masyarakat Suku Lom yang menyatu dengan alam, tradisi Nujuh Jerami, hutan larangan, serta pengakuan resmi atas Kepercayaan Terhadap Tuhan Yang Maha Esa.',
};

export default function KepercayaanLayout({ children }: { children: React.ReactNode }) {
  return children;
}