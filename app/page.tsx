import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Landmark, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1f2a1a] z-0">
          <Image
            src="https://picsum.photos/seed/mapur/1920/1080"
            alt="Pemandangan Hutan Mapur"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#c9a24b] font-medium tracking-widest uppercase text-sm mb-4">Profil Budaya</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#faf6ec] leading-tight mb-6">
            Desa Mapur,<br />
            <span className="text-[#c9a24b]">Rumah Bagi Suku Lom</span>
          </h1>
          <p className="text-lg md:text-xl text-[#faf6ec]/90 max-w-2xl font-light leading-relaxed mb-10">
            Mengenal lebih dekat warisan leluhur, sejarah, dan kearifan lokal salah satu suku tertua di Kepulauan Bangka Belitung.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sejarah" className="bg-[#c9a24b] hover:bg-[#b08c3e] text-[#1f2a1a] font-medium px-8 py-3 rounded-sm transition-colors">
              Pelajari Sejarah
            </Link>
            <Link href="/wisata" className="bg-transparent border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b]/10 font-medium px-8 py-3 rounded-sm transition-colors">
              Jelajahi Wisata
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-[#1f2a1a] py-10 px-4">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-[#faf6ec]">
          <div className="flex flex-col items-center">
            <MapPin size={28} className="text-[#c9a24b] mb-2" />
            <span className="text-2xl font-serif font-bold">Riau Silip</span>
            <span className="text-sm opacity-70">Kecamatan, Kabupaten Bangka</span>
          </div>
          <div className="flex flex-col items-center">
            <Landmark size={28} className="text-[#c9a24b] mb-2" />
            <span className="text-2xl font-serif font-bold">Gebong Memarong</span>
            <span className="text-sm opacity-70">Rumah adat khas Suku Lom</span>
          </div>
          <div className="flex flex-col items-center">
            <Users size={28} className="text-[#c9a24b] mb-2" />
            <span className="text-2xl font-serif font-bold">Orang Lum</span>
            <span className="text-sm opacity-70">Salah satu suku tertua di Babel</span>
          </div>
        </div>
      </section>

      {/* 3 Cards Summary Section */}
      <section className="w-full py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f2a1a] dark:text-[#faf6ec] mb-4">Mengenal Suku Lom</h2>
            <div className="w-24 h-1 bg-[#c9a24b] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col bg-white dark:bg-[#2a3625] shadow-lg rounded-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://picsum.photos/seed/sejarah/600/400" alt="Sejarah" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-3">Sejarah & Asal Usul</h3>
                <p className="text-sm opacity-80 mb-6 flex-grow">
                  Menelusuri jejak salah satu suku tertua di Bangka Belitung, dari era Majapahit hingga pengembara Vietnam, serta perjalanan masyarakat dari Dusun Air Abik ke Mapur.
                </p>
                <Link href="/sejarah" className="inline-flex items-center text-[#c9a24b] font-medium hover:underline mt-auto">
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>

            <div className="group flex flex-col bg-white dark:bg-[#2a3625] shadow-lg rounded-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://picsum.photos/seed/kepercayaan/600/400" alt="Kepercayaan" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-3">Kepercayaan & Adat</h3>
                <p className="text-sm opacity-80 mb-6 flex-grow">
                  Memahami filosofi hidup yang menyatu dengan alam, hutan larangan, serta pengakuan resmi atas Kepercayaan Terhadap Tuhan Yang Maha Esa.
                </p>
                <Link href="/kepercayaan" className="inline-flex items-center text-[#c9a24b] font-medium hover:underline mt-auto">
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>

            <div className="group flex flex-col bg-white dark:bg-[#2a3625] shadow-lg rounded-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://picsum.photos/seed/karyaseni/600/400" alt="Karya Seni" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-3">Karya Seni & Budaya</h3>
                <p className="text-sm opacity-80 mb-6 flex-grow">
                  Mengeksplorasi arsitektur tradisional Gebong Memarong, kerajinan anyaman bantal herbal, hingga tradisi lisan yang masih terjaga.
                </p>
                <Link href="/seni" className="inline-flex items-center text-[#c9a24b] font-medium hover:underline mt-auto">
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="w-full py-20 px-4 bg-black/5 dark:bg-white/5">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-6xl font-serif text-[#c9a24b] leading-none">&ldquo;</span>
          <p className="text-xl md:text-2xl font-serif italic text-[#1f2a1a] dark:text-[#faf6ec] leading-relaxed -mt-6">
            Gunung, hutan, sungai, dan langit diyakini menyatu dengan roh leluhur —
            sebuah pandangan hidup yang menjaga keseimbangan antara manusia dan alam.
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-[#c9a24b] font-medium">
            Filosofi Hidup Masyarakat Lom
          </p>
        </div>
      </section>

      {/* Wisata Preview / CTA Section */}
      <section className="w-full py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-sm overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://picsum.photos/seed/wisatamapur/1600/700"
                alt="Wisata Desa Mapur"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#1f2a1a]/70"></div>
            </div>
            <div className="relative z-10 py-20 px-8 text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#faf6ec] mb-4">
                Rencanakan Kunjunganmu
              </h2>
              <p className="text-[#faf6ec]/90 max-w-xl mb-8">
                Rasakan langsung suasana Gebong Memarong dan kehidupan masyarakat Orang Lum
                dari dekat — tersedia penginapan dan pemandu wisata lokal.
              </p>
              <Link
                href="/wisata"
                className="inline-flex items-center gap-2 bg-[#c9a24b] hover:bg-[#b08c3e] text-[#1f2a1a] font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Lihat Destinasi Wisata <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}