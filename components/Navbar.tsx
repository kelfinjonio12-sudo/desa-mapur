'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Sejarah', path: '/sejarah' },
    { name: 'Kepercayaan & Adat', path: '/kepercayaan' },
    { name: 'Seni & Budaya', path: '/seni' },
    { name: 'Wisata', path: '/wisata' },
    { name: 'Galeri', path: '/galeri' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c9a24b]/20 bg-[#faf6ec]/90 dark:bg-[#1f2a1a]/90 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-xl font-bold text-[#c9a24b]">Desa Mapur</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-[#c9a24b] ${
                pathname === link.path ? 'text-[#c9a24b]' : 'text-[#1f2a1a] dark:text-[#faf6ec]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            {isDarkMode ? <Sun size={18} className="text-[#c9a24b]" /> : <Moon size={18} className="text-[#1f2a1a]" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            {isDarkMode ? <Sun size={18} className="text-[#c9a24b]" /> : <Moon size={18} className="text-[#1f2a1a]" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#1f2a1a] dark:text-[#faf6ec]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-[#c9a24b]/20 bg-[#faf6ec] dark:bg-[#1f2a1a]">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                  pathname === link.path ? 'text-[#c9a24b] border-l-4 border-[#c9a24b]' : 'text-[#1f2a1a] dark:text-[#faf6ec] border-l-4 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
