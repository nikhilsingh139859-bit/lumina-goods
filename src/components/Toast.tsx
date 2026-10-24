import React from 'react';

export interface ToastMessage {
  id: number;
  title: string;
  description: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed bottom-6 right-6 z-50 bg-[#2a2a2c] text-[#e5e1e4] p-3 shadow-[4px_4px_0px_0px_#000000] border border-[#464554] flex items-center gap-3 cursor-pointer transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 max-w-sm"
    >
      <div className="w-8 h-8 bg-[#4edea3] flex items-center justify-center text-[#003824] shrink-0 font-bold">
        <span className="material-symbols-outlined text-lg">check</span>
      </div>
      <div className="min-w-0">
        <div className="font-headline text-xs font-bold uppercase tracking-wide truncate">
          {toast.title}
        </div>
        <div className="font-mono text-[11px] text-[#c7c4d7] truncate">
          {toast.description}
        </div>
      </div>
    </div>
  );
};
