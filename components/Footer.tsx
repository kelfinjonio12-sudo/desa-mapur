import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#c9a24b]/20 bg-[#1f2a1a] text-[#faf6ec] dark:bg-[#0f140d]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#c9a24b] mb-4">Desa Mapur</h3>
            <p className="text-sm opacity-80 max-w-xs">
              Rumah bagi Suku Lom, salah satu suku tertua di Kepulauan Bangka Belitung yang terus melestarikan warisan leluhur.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#c9a24b]">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/sejarah" className="hover:text-[#c9a24b] transition-colors">Sejarah</Link></li>
              <li><Link href="/kepercayaan" className="hover:text-[#c9a24b] transition-colors">Kepercayaan & Adat</Link></li>
              <li><Link href="/seni" className="hover:text-[#c9a24b] transition-colors">Seni & Budaya</Link></li>
              <li><Link href="/wisata" className="hover:text-[#c9a24b] transition-colors">Wisata</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#c9a24b]">Kontak</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Pemerintah Desa Mapur</li>
              <li>Kecamatan Riau Silip</li>
              <li>Kabupaten Bangka</li>
              <li>Kepulauan Bangka Belitung</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs opacity-60 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Profil Budaya Desa Mapur.</p>
          <Link href="/admin" className="mt-4 md:mt-0 hover:text-[#c9a24b] transition-colors">Login Admin</Link>
        </div>
      </div>
    </footer>
  );
}
