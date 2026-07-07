import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Dokumentasi | Desa Mapur',
  description:
    'Kumpulan foto dan video yang merekam kehidupan, budaya, dan alam Desa Mapur serta masyarakat Suku Lom di Kepulauan Bangka Belitung.',
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}