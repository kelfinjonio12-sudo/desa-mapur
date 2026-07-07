import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sejarah & Asal Usul Suku Lom | Desa Mapur',
  description:
    'Menelusuri jejak sejarah Suku Lom, salah satu suku tertua di Kepulauan Bangka Belitung — dari asal-usul yang penuh misteri hingga perjalanan masyarakat dari Dusun Air Abik ke Desa Mapur.',
};

export default function SejarahLayout({ children }: { children: React.ReactNode }) {
  return children;
}