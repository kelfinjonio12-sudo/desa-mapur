import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karya Seni & Budaya Suku Lom | Desa Mapur',
  description:
    'Mengenal arsitektur tradisional Gebong Memarong, kerajinan anyaman sumpet, kuliner beras merah, dan warisan budaya khas Suku Lom di Desa Mapur, Bangka Belitung.',
};

export default function SeniLayout({ children }: { children: React.ReactNode }) {
  return children;
}