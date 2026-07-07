'use client';

import { useState } from 'react';
import { supabase, MEDIA_BUCKET } from '@/lib/supabase';
import { UploadCloud, Loader2 } from 'lucide-react';

type Props = {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
};

export default function ImageUploadField({ label, value, folder, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (jpg, png, webp, dll).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5MB.');
      return;
    }

    setUploading(true);
    try {
      const path = `${folder}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      console.error(err);
      setError('Gagal upload gambar. Coba lagi.');
    }
    setUploading(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="w-full max-h-48 object-cover rounded-sm mb-2 border border-black/10"
        />
      )}

      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-black/20 dark:border-white/20 rounded-sm py-4 cursor-pointer hover:border-[#c9a24b] transition-colors text-sm opacity-80">
        {uploading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Mengupload...
          </>
        ) : (
          <>
            <UploadCloud size={18} /> {value ? 'Ganti gambar' : 'Pilih gambar'}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </label>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
