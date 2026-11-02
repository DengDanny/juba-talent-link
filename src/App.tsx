import { useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import ActionCards from "@/components/ActionCards";
import ListingsSection from "@/components/ListingsSection";
import Footer from "@/components/Footer";
import { addJob, addSeeker, loadJobs, loadSeekers } from "@/data/mockData";
import type { JobPosting, JobSeeker } from "@/types";

function Home({ seekers, jobs }: { seekers: JobSeeker[]; jobs: JobPosting[] }) {
  return (
    <>
      <Header />
      <main>
        <ActionCards />
        <ListingsSection seekers={seekers} jobs={jobs} />
      </main>
      <Footer />
    </>
  );
}

function BackBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <Link
          to="/"
          aria-label="Back to home"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 active:scale-95"
        >
          <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" />
        </Link>
        <div className="leading-tight">
          <h1 className="text-base font-extrabold text-slate-900">{title}</h1>
          <p className="text-[13px] text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-bold text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#16a34a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
      />
    </label>
  );
}

function Notice({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-start gap-2 rounded-xl border border-[#16a34a]/30 bg-[#16a34a]/5 p-3">
      <Sparkles size={16} className="mt-0.5 shrink-0 text-[#15803d]" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function JoinPage({ onCreated }: { onCreated: () => void }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    skills: "",
    rate: "",
    bio: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required to join.");
      return;
    }
    addSeeker({
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim() || "Juba",
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      rate: form.rate.trim() || "Contact for rate",
      bio: form.bio.trim() || "Skilled worker available for jobs in Juba.",
    });
    onCreated();
    toast.success("You are on the list. Workers near you can call now.");
    navigate("/");
  };

  return (
    <>
      <BackBar title="Join as a Seeker" subtitle="Add yourself to the Juba work directory" />
      <main className="mx-auto max-w-2xl px-4 py-5">
        <Notice text="This is a fast onboarding preview. Your details save instantly on this device and appear in the latest workers feed." />
        <form onSubmit={submit} className="space-y-3">
          <Field label="Full name" placeholder="e.g. Deng Majok" value={form.name} onChange={set("name")} />
          <Field label="Phone" type="tel" placeholder="+211 9..." value={form.phone} onChange={set("phone")} />
          <Field label="City / neighborhood" placeholder="e.g. Munuki" value={form.city} onChange={set("city")} />
          <Field label="Skills (comma separated)" placeholder="Masonry, Tiling, Plastering" value={form.skills} onChange={set("skills")} />
          <Field label="Rate / terms (optional)" placeholder="e.g. Negotiable or SSP / job" value={form.rate} onChange={set("rate")} />
          <Field label="Short bio" placeholder="Tell employers what you do best" value={form.bio} onChange={set("bio")} />
          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-4 text-base font-extrabold text-white active:scale-[0.99]"
          >
            <CheckCircle2 size={18} strokeWidth={2.5} aria-hidden="true" />
            Join the directory
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

function PostJobPage({ onCreated }: { onCreated: () => void }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employer_name: "",
    phone: "",
    title: "",
    skill_needed: "",
    city: "",
    pay: "",
    description: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.phone.trim()) {
      toast.error("Job title and phone are required.");
      return;
    }
    addJob({
      employer_name: form.employer_name.trim() || "Employer in Juba",
      phone: form.phone.trim(),
      title: form.title.trim(),
      skill_needed: form.skill_needed.trim() || "General",
      city: form.city.trim() || "Juba",
      pay: form.pay.trim() || "Contact to agree",
      description: form.description.trim() || "Work available in Juba.",
    });
    onCreated();
    toast.success("Job posted. It is live in the latest jobs feed.");
    navigate("/");
  };

  return (
    <>
      <BackBar title="Post a Job" subtitle="Find trusted workers across Juba" />
      <main className="mx-auto max-w-2xl px-4 py-5">
        <Notice text="This is a fast posting preview. Your job saves instantly on this device and appears in the latest jobs feed." />
        <form onSubmit={submit} className="space-y-3">
          <Field label="Employer / business name" placeholder="e.g. Nile Star Construction" value={form.employer_name} onChange={set("employer_name")} />
          <Field label="Contact phone" type="tel" placeholder="+211 9..." value={form.phone} onChange={set("phone")} />
          <Field label="Job title" placeholder="e.g. Site Mason Needed" value={form.title} onChange={set("title")} />
          <Field label="Skill needed" placeholder="e.g. Masonry" value={form.skill_needed} onChange={set("skill_needed")} />
          <Field label="City / neighborhood" placeholder="e.g. Kator" value={form.city} onChange={set("city")} />
          <Field label="Pay / budget (optional)" placeholder="e.g. Negotiable, per contract, etc." value={form.pay} onChange={set("pay")} />
          <Field label="Description" placeholder="What the work involves" value={form.description} onChange={set("description")} />
          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-base font-extrabold text-white active:scale-[0.99]"
          >
            <CheckCircle2 size={18} strokeWidth={2.5} aria-hidden="true" />
            Post the job
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [seekers, setSeekers] = useState<JobSeeker[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  const refresh = useCallback(() => {
    setSeekers(loadSeekers());
    setJobs(loadJobs());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <HashRouter>
      <div className="flex min-h-[100dvh] flex-col bg-white text-slate-900">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home seekers={seekers} jobs={jobs} />} />
            <Route path="/join" element={<JoinPage onCreated={refresh} />} />
            <Route path="/post-job" element={<PostJobPage onCreated={refresh} />} />
          </Routes>
        </div>
      </div>
      <Toaster richColors position="top-center" closeButton />
    </HashRouter>
  );
}