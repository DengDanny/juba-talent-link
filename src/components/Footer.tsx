import { Wifi } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-4 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#16a34a] text-white">
            <Wifi size={15} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <p className="text-sm font-extrabold text-slate-900">
            Juba Talent Link
          </p>
        </div>

        <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-slate-500">
          Built for 2G networks and low-end phones. No heavy images, no video,
          no tracking. Just fast, clear access to work and workers across Juba.
        </p>

        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-slate-600">
          <a href="#/" className="hover:text-[#15803d]">Home</a>
          <a href="#/join" className="hover:text-[#15803d]">Join as Seeker</a>
          <a href="#/post-job" className="hover:text-[#15803d]">Post a Job</a>
        </nav>

        <p className="mt-5 text-xs text-slate-400">
          Lightweight footprint, under 50KB on first load.
        </p>
      </div>
    </footer>
  );
}
