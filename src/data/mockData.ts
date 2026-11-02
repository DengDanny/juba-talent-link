import type { JobPosting, JobSeeker, NewJob, NewSeeker } from "@/types";

// Namespaced localStorage keys. Swapping these for supabase.from() later is a
// drop-in change because the row shape already matches the DB schema.
const SEEKERS_KEY = "jtl_seekers_v1";
const JOBS_KEY = "jtl_jobs_v1";

const now = Date.now();
const hrs = (h: number) => new Date(now - h * 3600_000).toISOString();

// Realistic Juba seed data across genuine neighborhoods.
const SEED_SEEKERS: JobSeeker[] = [
  {
    id: "sk-101",
    name: "Deng Majok",
    phone: "+211912345601",
    city: "Munuki",
    skills: ["Masonry", "Plastering", "Tiling"],
    rate: "Negotiable on call",
    bio: "12 years building homes in Munuki and Kator. Own tools, reliable, can start within 2 days.",
    photo_url: null,
    timestamp: hrs(2),
  },
  {
    id: "sk-102",
    name: "Achieng Odhiambo",
    phone: "+211912345602",
    city: "Hai Malakal",
    skills: ["Tailoring", "Embroidery", "Fashion Design"],
    rate: "Per job / discuss on call",
    bio: "Seamstress with a shop in Hai Malakal. Wedding gowns, uniforms, and repairs. Fast turnaround.",
    photo_url: null,
    timestamp: hrs(5),
  },
  {
    id: "sk-103",
    name: "Emmanuel Lado",
    phone: "+211912345603",
    city: "Gudele",
    skills: ["Driver", "Logistics", "Vehicle Repair"],
    rate: null,
    bio: "Licensed heavy-driver with 8 years cross-border experience. Also handles basic engine fixes.",
    photo_url: null,
    timestamp: hrs(9),
  },
  {
    id: "sk-104",
    name: "Nyadak Akech",
    phone: "+211912345604",
    city: "Atlabara",
    skills: ["Carpentry", "Furniture", "Welding"],
    rate: "Negotiable",
    bio: "Makes beds, wardrobes, and office desks. Custom orders welcome. Workshop in Atlabara.",
    photo_url: null,
    timestamp: hrs(14),
  },
  {
    id: "sk-105",
    name: "Peter Garang",
    phone: "+211912345605",
    city: "Kator",
    skills: ["Electrical", "Solar Install", "Wiring"],
    rate: "Per project / call",
    bio: "Certified electrician. Home wiring, solar panels, and inverters. References available on request.",
    photo_url: null,
    timestamp: hrs(20),
  },
  {
    id: "sk-106",
    name: "Salvador Ayen",
    phone: "+211912345606",
    city: "Jebel",
    skills: ["Cooking", "Catering", "Baking"],
    rate: null,
    bio: "Caterer for events and offices. Can feed 20 to 200 guests. Clean, punctual, local produce.",
    photo_url: null,
    timestamp: hrs(26),
  },
  {
    id: "sk-107",
    name: "Rebecca Monique",
    phone: "+211912345607",
    city: "Tongping",
    skills: ["Teaching", "English", "Math"],
    rate: "Negotiable on call",
    bio: "Primary and secondary tutor. Maths and English. Home or group lessons in Tongping.",
    photo_url: null,
    timestamp: hrs(33),
  },
  {
    id: "sk-108",
    name: "James Wani",
    phone: "+211912345608",
    city: "Magomi",
    skills: ["Plumbing", "Bathroom Fitting", "Water Tanks"],
    rate: "Per job",
    bio: "Plumber for homes and small hotels. Tank installs, leak fixes, and new bathroom fittings.",
    photo_url: null,
    timestamp: hrs(41),
  },
];

const SEED_JOBS: JobPosting[] = [
  {
    id: "jb-201",
    employer_name: "Nile Star Construction",
    phone: "+211920000201",
    title: "Site Mason Needed",
    skill_needed: "Masonry",
    city: "Kator",
    pay: "Negotiable on contact",
    description: "Two experienced masons for a boundary wall and foundation in Kator. Tools provided, 10-day project.",
    timestamp: hrs(1),
  },
  {
    id: "jb-202",
    employer_name: "Green Leaf Hotel",
    phone: "+211920000202",
    title: "Kitchen Cook",
    skill_needed: "Cooking",
    city: "Munuki",
    pay: "Salary negotiable",
    description: "Full-time cook for hotel restaurant. Local and continental dishes. Steady income, meals included.",
    timestamp: hrs(4),
  },
  {
    id: "jb-203",
    employer_name: "Bright Future School",
    phone: "+211920000203",
    title: "Math Teacher",
    skill_needed: "Teaching",
    city: "Atlabara",
    pay: null,
    description: "Primary maths teacher for next term. Must be patient and good with children. Morning schedule.",
    timestamp: hrs(8),
  },
  {
    id: "jb-204",
    employer_name: "Juba Solar Solutions",
    phone: "+211920000204",
    title: "Solar Installer",
    skill_needed: "Solar Install",
    city: "Gudele",
    pay: "Per project / discuss",
    description: "Home solar setups in Gudele and Jebel. Need certified electrician with own safety gear.",
    timestamp: hrs(13),
  },
  {
    id: "jb-205",
    employer_name: "Unity Transport Co",
    phone: "+211920000205",
    title: "Truck Driver",
    skill_needed: "Driver",
    city: "Hai Malakal",
    pay: "Negotiable",
    description: "Experienced driver for cargo runs around Juba. Valid heavy license required. Fuel covered.",
    timestamp: hrs(19),
  },
  {
    id: "jb-206",
    employer_name: "Mama Sarah Boutique",
    phone: "+211920000206",
    title: "Tailor for Uniforms",
    skill_needed: "Tailoring",
    city: "Kator",
    pay: "Per contract",
    description: "School and office uniforms. Bulk order, need 2 tailors for one month. Fabric supplied.",
    timestamp: hrs(25),
  },
  {
    id: "jb-207",
    employer_name: "Peace Plumbing Works",
    phone: "+211920000207",
    title: "Bathroom Plumber",
    skill_needed: "Plumbing",
    city: "Jebel",
    pay: null,
    description: "Fit out two new bathrooms in a Jebel house. Tank, pipes, and fittings all ready on site.",
    timestamp: hrs(31),
  },
  {
    id: "jb-208",
    employer_name: "Horizon Furniture",
    phone: "+211920000208",
    title: "Carpenter / Welder",
    skill_needed: "Carpentry",
    city: "Tongping",
    pay: "Negotiable on call",
    description: "Build office desks and steel chairs for a Tongping school. Workshop space available.",
    timestamp: hrs(38),
  },
];

function readStore<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    // localStorage unavailable (private mode / quota) -> keep in-memory seed.
    return fallback;
  }
}

function writeStore<T>(key: string, value: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* offline-safe: ignore persistence failures, data stays in memory */
  }
}

const byLatest = <T extends { timestamp: string }>(a: T, b: T) =>
  a.timestamp < b.timestamp ? 1 : -1;

export function loadSeekers(): JobSeeker[] {
  return readStore<JobSeeker>(SEEKERS_KEY, SEED_SEEKERS).slice().sort(byLatest);
}

export function loadJobs(): JobPosting[] {
  return readStore<JobPosting>(JOBS_KEY, SEED_JOBS).slice().sort(byLatest);
}

export function addSeeker(input: NewSeeker): JobSeeker {
  const seeker: JobSeeker = {
    ...input,
    id: `sk-${Date.now()}`,
    photo_url: input.photo_url ?? null,
    timestamp: new Date().toISOString(),
  };
  const next = [seeker, ...readStore<JobSeeker>(SEEKERS_KEY, SEED_SEEKERS)];
  writeStore(SEEKERS_KEY, next);
  return seeker;
}

export function addJob(input: NewJob): JobPosting {
  const job: JobPosting = {
    ...input,
    id: `jb-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  const next = [job, ...readStore<JobPosting>(JOBS_KEY, SEED_JOBS)];
  writeStore(JOBS_KEY, next);
  return job;
}