'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';
type ToastItem = { id: number; message: string; type: ToastType };

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-sm shadow-2xl border ${
              toast.type === 'success'
                ? 'bg-white dark:bg-[#2a3625] border-green-200 dark:border-green-900/40'
                : 'bg-white dark:bg-[#2a3625] border-red-200 dark:border-red-900/40'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <p className="text-sm flex-1 text-[#1f2a1a] dark:text-[#faf6ec]">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70 shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}