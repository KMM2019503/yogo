import PatientForm from "@/components/form/PatientForm";
import PasskeyAlert from "@/components/PasskeyAlert";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams.isAdmin === "true";

  return (
    <main className="relative h-[100svh] overflow-hidden bg-slate-200 md:h-[100dvh]">
      {isAdmin && <PasskeyAlert />}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.5),_rgba(165,243,252,0.82)_42%,_rgba(224,242,254,1)_80%)]" />

      <div className="relative mx-auto h-full w-full max-w-[540px] md:px-4 md:py-5">
        <div className="flex h-full flex-col md:overflow-hidden md:rounded-[36px] md:border md:border-slate-300/70 md:bg-white/20 md:shadow-[0_26px_70px_-40px_rgba(2,132,199,0.55)]">
          <section className="relative shrink-0 overflow-hidden px-5 pb-16 pt-6 sm:px-7 sm:pb-20 sm:pt-8">
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/yogo-logo.jpeg"}
                  alt="YoGo logo"
                  width={88}
                  height={88}
                  className="h-12 w-12 rounded-full border border-white/35 object-cover shadow-sm"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm">
                    Yogo Health
                  </p>
                  <p className="text-xs sm:text-sm">
                    Care that stays connected
                  </p>
                </div>
              </div>
              <Link
                href={"/?isAdmin=true"}
                className="rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/30"
              >
                Admin
              </Link>
            </div>
          </section>

          <section className="relative -mt-9 mt-auto flex max-h-[68svh] shrink-0 flex-col rounded-t-[34px] border border-slate-100 bg-[#f8fafc] px-5 pb-4 pt-6 shadow-[0_-18px_45px_-35px_rgba(2,6,23,0.55)] sm:max-h-[72svh] sm:px-7 sm:pt-7 md:max-h-[72dvh]">
            <div className="overflow-y-auto pb-3 pr-1">
              <PatientForm />
            </div>

            <footer className="border-t border-slate-200/90 pt-3 text-xs text-slate-500 sm:text-sm flex items-center justify-center">
              © 2026 YoGo Healthcare
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
