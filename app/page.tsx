import PatientForm from "@/components/form/PatientForm";
import PasskeyAlert from "@/components/PasskeyAlert";
import Image from "next/image";
import Link from "next/link";

const floatingCrosses = Array.from({ length: 28 }, (_, index) => {
  const row = Math.floor(index / 7);
  const col = index % 7;

  return {
    top: `${10 + row * 14 + (col % 2 === 0 ? 1.5 : -1.5)}%`,
    left: `${5 + col * 14 + (row % 2 === 0 ? 0 : 3)}%`,
    size: `${12 + ((index * 3) % 14)}px`,
    opacity: 0.54 + (index % 4) * 0.07,
    variant: index % 2 === 0 ? "a" : "b",
    delay: `${(index % 7) * -0.7}s`,
    duration: `${7 + (index % 5) * 1.1}s`,
  };
});

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams.isAdmin === "true";

  return (
    <main className="relative h-[100svh] overflow-hidden bg-slate-200 md:h-[100dvh]">
      {isAdmin && <PasskeyAlert />}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.5),_rgba(165,243,252,0.82)_42%,_rgba(224,242,254,1)_80%)]" />

      <div className="relative mx-auto h-full w-full max-w-[540px] md:px-4 md:py-5">
        <div className="relative flex h-full flex-col md:overflow-hidden md:rounded-[36px] md:border md:border-slate-300/70 md:bg-white/20 md:shadow-[0_26px_70px_-40px_rgba(2,132,199,0.55)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[66%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          >
            {floatingCrosses.map((cross, index) => (
              <span
                key={index}
                className={`medical-plus medical-plus--${cross.variant}`}
                style={{
                  top: cross.top,
                  left: cross.left,
                  fontSize: cross.size,
                  opacity: cross.opacity,
                  animationDelay: cross.delay,
                  animationDuration: cross.duration,
                }}
              >
                +
              </span>
            ))}
          </div>

          <section className="relative z-10 flex min-h-[36svh] flex-1 items-center justify-center overflow-hidden px-5 pb-16 pt-6 sm:px-7 sm:pb-20 sm:pt-8 md:min-h-[40dvh]">
            <div className="flex flex-col items-center gap-1 text-center">
              <Image
                src={"/yogo-logo.jpeg"}
                alt="YoGo logo"
                width={120}
                height={120}
                className="h-20 w-20 rounded-full border border-white/35 object-cover shadow-md"
              />
              <p className="text-sm font-bold sm:text-xl md:2xl">YOGO CARE</p>
              <p className="text-sm font-sans md:base">Care that stays connected</p>
            </div>
          </section>

          <section className="relative z-10 -mt-9 mt-auto flex max-h-[68svh] shrink-0 flex-col rounded-t-[34px] border border-slate-100 bg-[#f8fafc] px-5 pb-4 pt-6 shadow-[0_-18px_45px_-35px_rgba(2,6,23,0.55)] sm:max-h-[72svh] sm:px-7 sm:pt-7 md:max-h-[72dvh]">
            <div className="overflow-y-auto pb-3 pr-1">
              <PatientForm />
            </div>

            <footer className="border-t border-slate-200/90 pt-3 text-xs text-slate-500 sm:text-sm flex items-center justify-center">

              <p className="text-xs text-muted font-thin">© 2026 YoGo Healthcare</p>

              <Link
                href={"/?isAdmin=true"}
                className="absolute right-5 top-6 rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/30 sm:right-7 sm:top-8"
              >
                Admin
              </Link>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
