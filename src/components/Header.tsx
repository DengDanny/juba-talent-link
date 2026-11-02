import { Briefcase, Wifi } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      {/* Exact accessible title for screen readers and DOM checks. */}
      <span className="sr-only">Juba Talent Link - Find Work, Find Workers</span>
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#16a34a] text-white shadow-sm">
            <Briefcase size={22} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Juba Talent Link
            </h1>
            <p className="text-[13px] font-medium text-[#15803d]">
              Find Work, Find Workers
            </p>
          </div>
        </div>

        {/* Low-data / network footprint indicator. */}
        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#16a34a]/30 bg-[#16a34a]/10 px-2.5 py-1 text-[11px] font-bold text-[#15803d]">
            <Wifi size={13} strokeWidth={2.5} aria-hidden="true" />
            Low-data mode
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            2G ready
          </span>
        </div>
      </div>
    </header>
  );
}
