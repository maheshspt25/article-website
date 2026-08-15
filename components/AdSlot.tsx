import React from 'react';

export default function AdSlot({
  slotId = 'default-ad-slot',
  format = 'auto',
  className = '',
}: {
  slotId?: string;
  format?: string;
  className?: string;
}) {
  return (
    <div
      className={`my-6 p-3 rounded-xl bg-zinc-50/60 border border-zinc-200/60 text-center text-xs text-zinc-400 min-h-[90px] flex flex-col items-center justify-center transition-all ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
    >
      <div className="flex items-center gap-1.5 opacity-60">
        <span className="font-semibold text-[10px] tracking-widest uppercase bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded">
          Ad
        </span>
        <span className="text-[11px] text-zinc-400 font-medium">Advertisement Space</span>
      </div>
    </div>
  );
}
