import PatientForm from "@/components/form/PatientForm";
import PasskeyAlert from "@/components/PasskeyAlert";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams.isAdmin === "true";
  const trustSignals = [
    {
      title: "Privacy First",
      description: "Your personal details stay protected at every step.",
    },
    {
      title: "Accurate Booking",
      description: "Manage your upcoming appointments with clear updates.",
    },
    {
      title: "Always Available",
      description: "Access your care details anytime from one secure place.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(186,230,253,0.6),_rgba(248,250,252,1)_45%,_rgba(226,232,240,0.95)_100%)]">
      {isAdmin && <PasskeyAlert />}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-300/35 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-8">
        <div className="w-full rounded-[2rem] border border-slate-200/70 bg-white/95 shadow-[0_35px_90px_-40px_rgba(14,116,144,0.55)] backdrop-blur">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <Image
                  src={"/yogo-logo.jpeg"}
                  alt="YoGo logo"
                  width={88}
                  height={88}
                  className="h-14 w-14 rounded-full border border-sky-100 object-cover shadow-sm"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    YoGo Health
                  </p>
                  <p className="text-sm text-slate-500">
                    Care that stays connected
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Trusted access to your healthcare appointments
                </h1>
                <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                  Sign in with your contact details to schedule visits, update
                  records, and stay connected with your care team.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {trustSignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {signal.title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {signal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm sm:p-8">
              <PatientForm />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 sm:px-10">
            <p>© 2026 YoGo Healthcare</p>
            <Link
              href={"/?isAdmin=true"}
              className="font-medium text-sky-700 transition-colors hover:text-sky-800"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
