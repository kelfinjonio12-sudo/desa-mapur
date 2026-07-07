'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { MapPin, Phone, DollarSign } from 'lucide-react';

interface WisataItem {
  id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  harga_mulai?: string;
  kontak?: string;
  gambar?: string;
}

export default function WisataPage() {
  const [items, setItems] = useState<WisataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('wisata').select('*');
        if (error) throw error;
        setItems(data ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-4">Destinasi Wisata Budaya</h1>
        <div className="w-24 h-1 bg-[#c9a24b] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Jelajahi keindahan alam dan keunikan budaya Desa Mapur secara langsung.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col bg-white dark:bg-[#2a3625] shadow-lg rounded-sm overflow-hidden border border-[#c9a24b]/10">
              {item.gambar && (
                <div className="relative h-64 w-full">
                  <Image src={item.gambar} alt={item.nama} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-serif font-bold text-[#1f2a1a] dark:text-[#faf6ec] mb-4">{item.nama}</h2>
                <div className="opacity-80 leading-relaxed text-sm mb-6 flex-grow">
                  {item.deskripsi.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2">{paragraph}</p>
                  ))}
                </div>

                <div className="space-y-3 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                  {item.lokasi && (
                    <div className="flex items-start text-sm">
                      <MapPin size={18} className="text-[#c9a24b] mr-3 mt-0.5 shrink-0" />
                      <span className="opacity-80">{item.lokasi}</span>
                    </div>
                  )}
                  {item.harga_mulai && (
                    <div className="flex items-center text-sm">
                      <DollarSign size={18} className="text-[#c9a24b] mr-3 shrink-0" />
                      <span className="opacity-80 font-medium">{item.harga_mulai}</span>
                    </div>
                  )}
                  {item.kontak && (
                    <div className="flex items-center text-sm">
                      <Phone size={18} className="text-[#c9a24b] mr-3 shrink-0" />
                      <span className="opacity-80">{item.kontak}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-20 bg-black/5 dark:bg-white/5 rounded-sm">
              <p className="opacity-70 italic mb-2">Informasi destinasi wisata belum tersedia.</p>
              <p className="text-sm opacity-50">Kunjungi halaman ini nanti untuk pembaruan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
