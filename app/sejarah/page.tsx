'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface SejarahItem {
  id: string;
  judul: string;
  konten: string;
  urutan: number;
  gambar?: string;
}

export default function SejarahPage() {
  const [sejarahList, setSejarahList] = useState<SejarahItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSejarah() {
      try {
        const { data, error } = await supabase
          .from('sejarah')
          .select('*')
          .order('urutan', { ascending: true });
        if (error) throw error;
        setSejarahList(data ?? []);
      } catch (error) {
        console.error("Error fetching sejarah:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSejarah();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-4">Sejarah & Asal Usul</h1>
        <div className="w-24 h-1 bg-[#c9a24b] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Jejak perjalanan Suku Lom, dari akar sejarah masa lalu hingga menetap di Desa Mapur, menjadi penjaga warisan leluhur.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
        </div>
      ) : (
        <div className="space-y-16">
          {sejarahList.map((item, index) => (
            <div key={item.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-start`}>
              {item.gambar && (
                <div className="w-full md:w-5/12 relative h-64 md:h-80 rounded-sm overflow-hidden shadow-lg">
                  <Image
                    src={item.gambar}
                    alt={item.judul}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className={`w-full ${item.gambar ? 'md:w-7/12' : 'w-full'}`}>
                <h2 className="text-2xl font-serif font-bold text-[#1f2a1a] dark:text-[#faf6ec] mb-4">{item.judul}</h2>
                <div className="prose prose-lg dark:prose-invert prose-p:text-opacity-80 text-[#1f2a1a] dark:text-[#faf6ec] max-w-none">
                  {item.konten.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {sejarahList.length === 0 && !loading && (
            <p className="text-center opacity-70 italic py-10">Belum ada data sejarah yang ditambahkan.</p>
          )}
        </div>
      )}
    </div>
  );
}
