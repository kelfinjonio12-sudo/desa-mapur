'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Map, Users, Info, Building2 } from 'lucide-react';

interface ProfilDesa {
  id: string;
  nama_desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jumlah_penduduk: string;
  deskripsi_singkat: string;
  kontak_pemerintah: string;
}

export default function ProfilPage() {
  const [profil, setProfil] = useState<ProfilDesa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('profil_desa')
          .select('*')
          .eq('id', 'utama')
          .maybeSingle();
        if (error) throw error;
        setProfil(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
      </div>
    );
  }

  if (!profil) {
    return <div className="text-center py-20 opacity-70">Data profil belum tersedia.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-[#2a3625] rounded-sm shadow-xl overflow-hidden border border-[#c9a24b]/20">
        <div className="bg-[#1f2a1a] p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#faf6ec] mb-2">{profil.nama_desa}</h1>
            <p className="text-[#c9a24b] font-medium tracking-wide">Pusat Budaya Suku Lom</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert text-[#1f2a1a] dark:text-[#faf6ec] max-w-none text-center mb-12">
            <p className="text-xl font-serif italic leading-relaxed opacity-90">
              &quot;{profil.deskripsi_singkat}&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-[#c9a24b]/10 p-3 rounded-full mr-4">
                <Map size={24} className="text-[#c9a24b]" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-70 mb-1">Wilayah Administratif</h3>
                <p className="font-medium">Kecamatan {profil.kecamatan}</p>
                <p className="opacity-80 text-sm">Kabupaten {profil.kabupaten}</p>
                <p className="opacity-80 text-sm">{profil.provinsi}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#c9a24b]/10 p-3 rounded-full mr-4">
                <Users size={24} className="text-[#c9a24b]" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-70 mb-1">Demografi</h3>
                <p className="font-medium">{profil.jumlah_penduduk || 'Data belum diperbarui'} Penduduk</p>
              </div>
            </div>

            <div className="flex items-start md:col-span-2 border-t border-black/10 dark:border-white/10 pt-8 mt-4">
              <div className="bg-[#c9a24b]/10 p-3 rounded-full mr-4">
                <Building2 size={24} className="text-[#c9a24b]" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-70 mb-1">Kontak Pemerintah Desa</h3>
                <p className="font-medium">{profil.kontak_pemerintah || 'Belum ada kontak yang dicantumkan'}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-black/5 dark:bg-white/5 rounded-sm flex items-start border-l-4 border-[#c9a24b]">
            <Info size={24} className="text-[#c9a24b] mr-4 shrink-0 mt-1" />
            <div className="text-sm opacity-80 leading-relaxed">
              <p className="font-bold mb-1">Catatan Penting</p>
              Beberapa informasi mengenai wilayah adat dan lokasi sensitif mungkin belum ditampilkan sepenuhnya atau sedang dalam proses verifikasi dengan tokoh adat setempat.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
