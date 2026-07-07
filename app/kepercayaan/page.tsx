'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface KepercayaanItem {
  id: string;
  judul: string;
  konten: string;
  kategori: string;
  gambar?: string;
}

export default function KepercayaanPage() {
  const [items, setItems] = useState<KepercayaanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('semua');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('kepercayaan').select('*');
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

  const categories = ['semua', ...Array.from(new Set(items.map(item => item.kategori).filter(Boolean)))];

  const filteredItems = activeTab === 'semua'
    ? items
    : items.filter(item => item.kategori === activeTab);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-4">Kepercayaan & Adat Istiadat</h1>
        <div className="w-24 h-1 bg-[#c9a24b] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Filosofi hidup masyarakat Suku Lom yang menjunjung tinggi harmoni antara manusia, alam, dan roh leluhur.
        </p>
      </div>

      {!loading && categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                activeTab === cat
                  ? 'bg-[#c9a24b] text-[#1f2a1a]'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#2a3625] shadow-md rounded-sm overflow-hidden flex flex-col">
              {item.gambar && (
                <div className="relative h-48 w-full">
                  <Image src={item.gambar} alt={item.judul} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                {item.kategori && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c9a24b] mb-2 block">
                    {item.kategori.replace(/_/g, ' ')}
                  </span>
                )}
                <h2 className="text-xl font-serif font-bold text-[#1f2a1a] dark:text-[#faf6ec] mb-3">{item.judul}</h2>
                <div className="opacity-80 leading-relaxed text-sm">
                  {item.konten.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-10 opacity-70 italic">Belum ada data yang ditambahkan.</div>
          )}
        </div>
      )}
    </div>
  );
}
