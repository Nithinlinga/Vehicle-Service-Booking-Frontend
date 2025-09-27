import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-400/10" />
      </div>

      <main className="relative">
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="flex items-center justify-center w-full gap-10 lg:grid-cols-2">
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Trusted by 100k+ vehicle owners
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                <span className="block">Premium vehicle service,</span>
                <span className="block bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                  transparent pricing. zero hassle.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
                Book maintenance, repairs, and inspections at any Next-Gen Service
                Centre. Genuine parts, certified technicians, and same-day turnarounds
                on most jobs.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/user/service-centers"
                  className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  Book a Service
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <Stat label="Centres" value="150+" />
                <Stat label="Avg. Rating" value="4.8★" />
                <Stat label="Vehicles Served" value="100k+" />
                <Stat label="Support" value="24/7" />
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<ShieldIcon />}
              title="Certified Technicians"
              text="Factory‑trained experts for all major brands."
            />
            <Feature
              icon={<SparklesIcon />}
              title="Genuine Parts"
              text="OEM or equivalent parts with warranty."
            />
            <Feature
              icon={<ClockIcon />}
              title="Same‑Day Service"
              text="Quick turnarounds on common jobs."
            />
            <Feature
              icon={<ReceiptIcon />}
              title="Transparent Pricing"
              text="Upfront estimates. No surprises."
            />
          </div>
        </section>
      </main>
    </div>
  );
};
const Stat = ({ label, value }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-slate-600 dark:text-slate-300">{label}</div>
  </div>
);

const Feature = ({ icon, title, text }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 group-hover:bg-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-300 dark:ring-cyan-900/30">
      {icon}
    </div>
    <h3 className="text-base font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{text}</p>
  </div>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" className="fill-current" />
  </svg>
);
const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" className="fill-current" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="9" className="stroke-current" strokeWidth="2"></circle>
    <path d="M12 7v5l3 2" className="stroke-current" strokeWidth="2" strokeLinecap="round"></path>
  </svg>
);
const ReceiptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M7 3h10l1 2v16l-3-2-3 2-3-2-3 2V5l1-2z" className="stroke-current" strokeWidth="2" />
    <path d="M9 8h6M9 12h6M9 16h4" className="stroke-current" strokeWidth="2" strokeLinecap="round"></path>
  </svg>
);
export default Home;