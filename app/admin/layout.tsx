'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    function handleSession(session: Session | null) {
      setSession(session);
      setLoading(false);

      // Cookie penanda sesi untuk middleware (bukan pengaman utama;
      // keamanan data tetap dijaga oleh Row Level Security Supabase).
      if (session) {
        document.cookie = 'mapur_admin_session=1; path=/; max-age=86400; SameSite=Lax';
      } else {
        document.cookie = 'mapur_admin_session=; path=/; max-age=0';
      }

      if (!session && pathname !== '/admin') {
        router.push('/admin');
      } else if (session && pathname === '/admin') {
        router.push('/admin/dashboard');
      }
    }

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ec] dark:bg-[#1f2a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a24b]"></div>
      </div>
    );
  }

  if (!session && pathname !== '/admin') return null;

  return <>{children}</>;
}
