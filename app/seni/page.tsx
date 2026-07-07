'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface SeniItem {
  id: string;
  judul: string;
  konten: string;
  kategori: string;
  gambar?: string;
  harga_mulai?: string;
}

export default function SeniBudayaPage() {
  const [items, setItems] = useState<SeniItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('karya_seni').select('*');
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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-4">Karya Seni & Budaya</h1>
        <div className="w-24 h-1 bg-[#c9a24b] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Ekspresi jiwa dan kearifan lokal Suku Lom yang terwujud dalam arsitektur, kerajinan tangan, dan tradisi.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#2a3625] shadow-lg rounded-sm overflow-hidden flex flex-col md:flex-row">
              {item.gambar ? (
                <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                  <Image src={item.gambar} alt={item.judul} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="w-full md:w-1/2 bg-black/5 dark:bg-white/5 flex items-center justify-center min-h-[300px]">
                  <span className="opacity-30">Tidak ada gambar</span>
                </div>
              )}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                {item.kategori && (
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c9a24b] mb-3">
                    {item.kategori.replace(/_/g, ' ')}
                  </span>
                )}
                <h2 className="text-3xl font-serif font-bold text-[#1f2a1a] dark:text-[#faf6ec] mb-4">{item.judul}</h2>
                <div className="opacity-80 leading-relaxed mb-6">
                  {item.konten.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2">{paragraph}</p>
                  ))}
                </div>
                {item.harga_mulai && (
                  <div className="mt-auto inline-flex items-center px-4 py-2 bg-black/5 dark:bg-white/5 rounded-sm self-start">
                    <span className="text-sm opacity-70 mr-2">Harga Mulai:</span>
                    <span className="font-bold text-[#c9a24b]">{item.harga_mulai}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-10 opacity-70 italic">Belum ada karya seni yang ditambahkan.</div>
          )}
        </div>
      )}
    </div>
  );
}
