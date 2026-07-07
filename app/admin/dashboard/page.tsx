'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogOut, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import ImageUploadField from '@/components/ImageUploadField';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useToast } from '@/components/Toast';

type CollectionKey = 'sejarah' | 'kepercayaan' | 'karya_seni' | 'wisata' | 'galeri' | 'profil_desa';

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<CollectionKey>('sejarah');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const tabs: {key: CollectionKey, label: string}[] = [
    { key: 'sejarah', label: 'Sejarah' },
    { key: 'kepercayaan', label: 'Kepercayaan' },
    { key: 'karya_seni', label: 'Seni & Budaya' },
    { key: 'wisata', label: 'Wisata' },
    { key: 'galeri', label: 'Galeri' },
    { key: 'profil_desa', label: 'Profil Desa' }
  ];

  const fetchItems = async () => {
    setLoading(true);
    try {
      if (activeTab === 'profil_desa') {
        const { data } = await supabase.from('profil_desa').select('*').eq('id', 'utama').maybeSingle();
        setItems(data ? [data] : []);
      } else {
        const { data, error } = await supabase.from(activeTab).select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setItems(data ?? []);
      }
    } catch (error) {
      console.error(error);
      showToast('Gagal memuat data', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    setIsEditing(false);
  }, [activeTab]);

  const handleLogout = () => supabase.auth.signOut();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (error) throw error;
      fetchItems();
      showToast('Data berhasil dihapus', 'success');
    } catch (e) {
      showToast('Gagal menghapus data', 'error');
    }
    setConfirmDeleteId(null);
  };

  const openForm = (item: any = null) => {
    setFormData(item ? item : {});
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'profil_desa') {
        const { error } = await supabase.from('profil_desa').upsert({ ...formData, id: 'utama' });
        if (error) throw error;
      } else if (formData.id) {
        const dataToSave = { ...formData };
        delete dataToSave.id;
        const { error } = await supabase.from(activeTab).update(dataToSave).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(activeTab).insert(formData);
        if (error) throw error;
      }
      setIsEditing(false);
      fetchItems();
      showToast('Data berhasil disimpan', 'success');
    } catch (error) {
      showToast('Gagal menyimpan data', 'error');
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'urutan') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const renderFormFields = () => {
    if (activeTab === 'sejarah') {
      return (
        <>
          <InputField label="Judul" name="judul" value={formData.judul} onChange={handleChange} required />
          <TextAreaField label="Konten" name="konten" value={formData.konten} onChange={handleChange} required />
          <InputField label="Urutan Tampil (Angka)" name="urutan" type="number" value={formData.urutan} onChange={handleChange} />
          <ImageUploadField
            label="Gambar"
            value={formData.gambar}
            folder="sejarah"
            onChange={(url) => setFormData({ ...formData, gambar: url })}
          />
        </>
      );
    }
    if (activeTab === 'kepercayaan') {
      return (
        <>
          <InputField label="Judul" name="judul" value={formData.judul} onChange={handleChange} required />
          <TextAreaField label="Konten" name="konten" value={formData.konten} onChange={handleChange} required />
          <InputField label="Kategori (Misal: pantang_larang, upacara)" name="kategori" value={formData.kategori} onChange={handleChange} />
          <ImageUploadField
            label="Gambar"
            value={formData.gambar}
            folder="kepercayaan"
            onChange={(url) => setFormData({ ...formData, gambar: url })}
          />
        </>
      );
    }
    if (activeTab === 'karya_seni') {
      return (
        <>
          <InputField label="Judul" name="judul" value={formData.judul} onChange={handleChange} required />
          <TextAreaField label="Konten" name="konten" value={formData.konten} onChange={handleChange} required />
          <InputField label="Kategori (Misal: arsitektur, kerajinan)" name="kategori" value={formData.kategori} onChange={handleChange} />
          <InputField label="Harga Mulai (Opsional)" name="harga_mulai" value={formData.harga_mulai} onChange={handleChange} />
          <ImageUploadField
            label="Gambar"
            value={formData.gambar}
            folder="karya_seni"
            onChange={(url) => setFormData({ ...formData, gambar: url })}
          />
        </>
      );
    }
    if (activeTab === 'wisata') {
      return (
        <>
          <InputField label="Nama Wisata" name="nama" value={formData.nama} onChange={handleChange} required />
          <TextAreaField label="Deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleChange} required />
          <InputField label="Lokasi" name="lokasi" value={formData.lokasi} onChange={handleChange} />
          <InputField label="Harga Mulai" name="harga_mulai" value={formData.harga_mulai} onChange={handleChange} />
          <InputField label="Kontak" name="kontak" value={formData.kontak} onChange={handleChange} />
          <ImageUploadField
            label="Gambar"
            value={formData.gambar}
            folder="wisata"
            onChange={(url) => setFormData({ ...formData, gambar: url })}
          />
        </>
      );
    }
    if (activeTab === 'galeri') {
      return (
        <>
          <InputField label="Judul" name="judul" value={formData.judul} onChange={handleChange} required />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipe Media</label>
            <select
              name="tipe"
              value={formData.tipe || 'foto'}
              onChange={handleChange}
              className="w-full p-2 bg-black/5 dark:bg-white/5 border rounded-sm"
            >
              <option value="foto">Foto</option>
              <option value="video">Video (link YouTube/lainnya)</option>
            </select>
          </div>
          {formData.tipe === 'video' ? (
            <InputField label="URL Video" name="url_media" value={formData.url_media} onChange={handleChange} required />
          ) : (
            <ImageUploadField
              label="Foto"
              value={formData.url_media}
              folder="galeri"
              onChange={(url) => setFormData({ ...formData, url_media: url })}
            />
          )}
        </>
      );
    }
    if (activeTab === 'profil_desa') {
      return (
        <>
          <InputField label="Nama Desa" name="nama_desa" value={formData.nama_desa} onChange={handleChange} required />
          <InputField label="Kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleChange} required />
          <InputField label="Kabupaten" name="kabupaten" value={formData.kabupaten} onChange={handleChange} required />
          <InputField label="Provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} required />
          <InputField label="Jumlah Penduduk" name="jumlah_penduduk" value={formData.jumlah_penduduk} onChange={handleChange} />
          <TextAreaField label="Deskripsi Singkat" name="deskripsi_singkat" value={formData.deskripsi_singkat} onChange={handleChange} required />
          <InputField label="Kontak Pemerintah" name="kontak_pemerintah" value={formData.kontak_pemerintah} onChange={handleChange} />
        </>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1f2a1a] dark:text-[#c9a24b]">Admin Panel</h1>
          <p className="opacity-70 text-sm mt-1">Kelola konten website Desa Mapur</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-sm text-sm font-medium transition-colors"
        >
          <LogOut size={16} className="mr-2" /> Keluar
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex flex-col space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#1f2a1a] text-[#c9a24b] dark:bg-[#c9a24b] dark:text-[#1f2a1a]'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white dark:bg-[#2a3625] rounded-sm shadow-md p-6 border border-black/5 dark:border-white/5">
          {isEditing ? (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                <h2 className="text-xl font-serif font-bold">
                  {formData.id || activeTab === 'profil_desa' ? 'Edit Data' : 'Tambah Data'} - {tabs.find(t => t.key === activeTab)?.label}
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave}>
                <div className="space-y-4">
                  {renderFormFields()}
                </div>
                <div className="mt-8 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#1f2a1a] text-[#c9a24b] dark:bg-[#c9a24b] dark:text-[#1f2a1a] py-3 rounded-sm font-bold flex justify-center items-center hover:opacity-90 transition-opacity"
                  >
                    {loading ? 'Menyimpan...' : <><Save size={18} className="mr-2" /> Simpan</>}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold">{tabs.find(t => t.key === activeTab)?.label}</h2>
                {activeTab !== 'profil_desa' && (
                  <button
                    onClick={() => openForm()}
                    className="flex items-center px-4 py-2 bg-[#c9a24b] text-[#1f2a1a] rounded-sm text-sm font-bold hover:bg-[#b08c3e] transition-colors"
                  >
                    <Plus size={16} className="mr-1" /> Tambah Baru
                  </button>
                )}
              </div>

              {loading ? (
                <div className="py-10 text-center opacity-70">Memuat data...</div>
              ) : items.length === 0 ? (
                <div className="py-10 text-center opacity-70 italic">
                  {activeTab === 'profil_desa' ? (
                    <button onClick={() => openForm({ id: 'utama' })} className="text-[#c9a24b] underline">Buat Profil Utama</button>
                  ) : (
                    'Belum ada data. Silakan tambah baru.'
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/5 dark:bg-white/5">
                      <tr>
                        <th className="px-4 py-3 font-medium">Data Utama</th>
                        <th className="px-4 py-3 font-medium text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="font-bold">{item.judul || item.nama || item.nama_desa || 'Tanpa Judul'}</div>
                            {item.kategori && <div className="text-xs opacity-70 mt-1 uppercase">{item.kategori}</div>}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => openForm(item)}
                              className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-sm mr-2"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            {activeTab !== 'profil_desa' && (
                              <button
                                onClick={() => setConfirmDeleteId(item.id)}
                                className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-sm"
                                title="Hapus"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title="Hapus Data"
        message="Yakin ingin menghapus item ini? Tindakan ini tidak bisa dibatalkan."
        onConfirm={() => confirmDeleteId && handleDelete(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required = false }: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        className="w-full p-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm focus:ring-2 focus:ring-[#c9a24b] outline-none"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, required = false }: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        rows={5}
        className="w-full p-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm focus:ring-2 focus:ring-[#c9a24b] outline-none"
      />
    </div>
  );
}
