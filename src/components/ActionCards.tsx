import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users } from "lucide-react";

export default function ActionCards() {
  return (
    <section className="mx-auto grid max-w-2xl grid-cols-1 gap-3 px-4 pt-5 sm:grid-cols-2">
      {/* Seeker CTA */}
      <Link
        to="/join"
        className="group flex min-h-[44px] flex-col justify-between rounded-2xl bg-[#16a34a] p-5 text-white shadow-sm transition-transform duration-150 active:scale-[0.98] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <Users size={22} strokeWidth={2} aria-hidden="true" />
          </span>
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-extrabold leading-tight">I Need Work</h2>
          <p className="mt-1 text-sm font-medium text-white/85">
            Join as a Seeker
          </p>
        </div>
      </Link>

      {/* Employer CTA */}
      <Link
        to="/post-job"
        className="group flex min-h-[44px] flex-col justify-between rounded-2xl border-2 border-slate-900 bg-white p-5 text-slate-900 shadow-sm transition-transform duration-150 active:scale-[0.98] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Briefcase size={22} strokeWidth={2} aria-hidden="true" />
          </span>
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-extrabold leading-tight">I Need Workers</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Post a Job
          </p>
        </div>
      </Link>
    </section>
  );
}
