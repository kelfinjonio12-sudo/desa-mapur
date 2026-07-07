'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GaleriItem {
  id: string;
  judul: string;
  url_media: string;
  tipe: 'foto' | 'video';
}

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('galeri').select('*');
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
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b] mb-4">Galeri Dokumentasi</h1>
        <div className="w-24 h-1 bg-[#c9a24b] mx-auto mb-6"></div>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Merekam jejak kehidupan, budaya, dan alam Desa Mapur dalam bingkai visual.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group rounded-sm overflow-hidden bg-black/5 dark:bg-white/5 shadow-md">
              {item.tipe === 'foto' ? (
                <div className="relative w-full aspect-auto min-h-[200px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url_media} alt={item.judul} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                </div>
              ) : (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                  <video src={item.url_media} controls className="w-full h-full object-cover" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-white font-medium text-sm truncate">{item.judul}</p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-70 italic w-full block">Belum ada media dalam galeri.</div>
          )}
        </div>
      )}
    </div>
  );
}
