import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Profil Budaya Desa Mapur',
  description: 'Desa Mapur, Rumah Bagi Suku Lom. Salah satu suku tertua di Bangka Belitung.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#faf6ec] text-[#1f2a1a] dark:bg-[#1f2a1a] dark:text-[#faf6ec] min-h-screen flex flex-col" suppressHydrationWarning>
        <ToastProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}