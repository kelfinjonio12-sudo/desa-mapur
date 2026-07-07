'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Gagal login. Periksa kembali email dan password.');
      setLoading(false);
      return;
    }
    // Layout akan handle redirect otomatis setelah state auth berubah
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#2a3625] rounded-sm shadow-2xl overflow-hidden border border-[#c9a24b]/20">
        <div className="bg-[#1f2a1a] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a24b]/20 mb-4">
            <Lock size={32} className="text-[#c9a24b]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#faf6ec]">Admin Panel</h1>
          <p className="text-[#c9a24b] text-sm mt-2">Masuk untuk mengelola konten</p>
        </div>
        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium opacity-80 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#c9a24b] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium opacity-80 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#c9a24b] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a24b] hover:bg-[#b08c3e] text-[#1f2a1a] font-bold py-3 px-4 rounded-sm transition-colors flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">Memproses...</span> : 'Masuk'}
            </button>
          </form>
          <div className="mt-6 text-center text-xs opacity-60">
            <p>Hanya untuk pengurus web resmi Desa Mapur.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
