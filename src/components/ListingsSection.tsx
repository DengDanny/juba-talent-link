import { useMemo, useState } from "react";
import {
  Building2,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Users,
  Briefcase,
  X,
} from "lucide-react";
import type { JobPosting, JobSeeker, ListingTab } from "@/types";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function ContactActions({ phone }: { phone: string }) {
  return (
    <div className="mt-3 flex gap-2">
      <a
        href={`tel:${phone}`}
        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-3 text-sm font-bold text-white active:scale-[0.98]"
      >
        <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
        Call
      </a>
      <a
        href={`sms:${phone}`}
        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#16a34a] bg-white px-3 text-sm font-bold text-[#15803d] active:scale-[0.98]"
      >
        <MessageSquare size={16} strokeWidth={2.5} aria-hidden="true" />
        SMS
      </a>
    </div>
  );
}

function SeekerCard({ seeker }: { seeker: JobSeeker }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16a34a]/10 text-base font-extrabold text-[#15803d]">
          {initials(seeker.name)}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-extrabold text-slate-900">
            {seeker.name}
          </h4>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-500">
            <MapPin size={13} strokeWidth={2} aria-hidden="true" />
            {seeker.city}
            <span className="mx-1 text-slate-300">|</span>
            <Clock size={13} strokeWidth={2} aria-hidden="true" />
            {timeAgo(seeker.timestamp)}
          </p>
        </div>
        {seeker.rate ? (
          <span className="shrink-0 rounded-lg bg-[#16a34a]/10 px-2.5 py-1 text-[12px] font-bold text-[#15803d]">
            {seeker.rate}
          </span>
        ) : (
          <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-500">
            Rate on call
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {seeker.skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-700"
          >
            {s}
          </span>
        ))}
      </div>

      <p
        className={`mt-3 text-sm leading-relaxed text-slate-600 ${
          open ? "" : "line-clamp-2"
        }`}
      >
        {seeker.bio}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-[#15803d]"
      >
        {open ? "Show less" : "Read more"}
        <ChevronRight
          size={14}
          strokeWidth={2.5}
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ContactActions phone={seeker.phone} />
    </article>
  );
}

function JobCard({ job }: { job: JobPosting }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Building2 size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-extrabold text-slate-900">
            {job.title}
          </h4>
          <p className="truncate text-[13px] font-medium text-slate-500">
            {job.employer_name}
          </p>
        </div>
        {job.pay ? (
          <span className="shrink-0 rounded-lg bg-[#16a34a]/10 px-2.5 py-1 text-right text-[12px] font-bold text-[#15803d]">
            {job.pay}
          </span>
        ) : (
          <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-right text-[12px] font-semibold text-slate-500">
            Negotiable
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-slate-600">
        <span className="inline-flex items-center gap-1">
          <MapPin size={13} strokeWidth={2} aria-hidden="true" />
          {job.city}
        </span>
        <span className="mx-1 text-slate-300">|</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={13} strokeWidth={2} aria-hidden="true" />
          {timeAgo(job.timestamp)}
        </span>
      </div>

      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[12px] font-bold text-white">
        <Briefcase size={12} strokeWidth={2.5} aria-hidden="true" />
        {job.skill_needed}
      </span>

      <p
        className={`mt-3 text-sm leading-relaxed text-slate-600 ${
          open ? "" : "line-clamp-2"
        }`}
      >
        {job.description}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-[#15803d]"
      >
        {open ? "Show less" : "Read more"}
        <ChevronRight
          size={14}
          strokeWidth={2.5}
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ContactActions phone={job.phone} />
    </article>
  );
}

interface Props {
  seekers: JobSeeker[];
  jobs: JobPosting[];
}

export default function ListingsSection({ seekers, jobs }: Props) {
  const [tab, setTab] = useState<ListingTab>("workers");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filteredSeekers = useMemo(() => {
    const list = seekers.slice(0, 6);
    if (!q) return list;
    return seekers
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [seekers, q]);

  const filteredJobs = useMemo(() => {
    const list = jobs.slice(0, 6);
    if (!q) return list;
    return jobs
      .filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          j.skill_needed.toLowerCase().includes(q) ||
          j.employer_name.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [jobs, q]);

  const tabs: { id: ListingTab; label: string; icon: typeof Users }[] = [
    { id: "workers", label: `Latest Workers (${filteredSeekers.length})`, icon: Users },
    { id: "jobs", label: `Latest Jobs (${filteredJobs.length})`, icon: Briefcase },
  ];

  return (
    <section className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4">
        <h3 className="text-lg font-extrabold text-slate-900">
          Current Opportunities
        </h3>
        <p className="text-sm text-slate-500">
          Fresh listings from workers and employers across Juba.
        </p>
      </div>

      {/* Search toggle */}
      <div className="relative mb-3">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills, names, areas..."
          aria-label="Search listings"
          className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#16a34a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 active:bg-slate-100"
          >
            <X size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Segmented tab switch */}
      <div
        role="tablist"
        aria-label="Listing type"
        className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-2 text-[13px] font-bold transition-colors sm:text-sm ${
                active
                  ? "bg-white text-[#15803d] shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Listings grid */}
      {tab === "workers" ? (
        filteredSeekers.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filteredSeekers.map((s) => (
              <SeekerCard key={s.id} seeker={s} />
            ))}
          </div>
        ) : (
          <EmptyState label="No workers match your search." />
        )
      ) : filteredJobs.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredJobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      ) : (
        <EmptyState label="No jobs match your search." />
      )}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}