import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppointmentForm from "@/components/form/AppointmentForm";
import { getPatient } from "@/actions/patient.action";
import { redirect } from "next/navigation";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  if (!patient) {
    redirect(`/patients/${userId}/register`);
  }

  return (
    <main className="relative h-[100svh] overflow-hidden bg-slate-200 md:h-[100dvh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.52),_rgba(186,230,253,0.88)_44%,_rgba(224,242,254,1)_82%)]" />

      <div className="relative mx-auto h-full w-full max-w-[640px] md:px-4 md:py-5">
        <div className="flex h-full flex-col md:overflow-hidden md:rounded-[36px] md:border md:border-slate-300/70 md:bg-white/20 md:shadow-[0_26px_70px_-40px_rgba(2,132,199,0.55)]">
          <section className="relative shrink-0 overflow-hidden px-5 pb-10 pt-6 sm:px-7 sm:pb-12 sm:pt-8">
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
                href={"/"}
                className="rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/30"
              >
                Switch account
              </Link>
            </div>

            <div className="relative z-10 mt-7 space-y-2 sm:mt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                New Appointment
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Hi {patient.name}
              </h1>
              <p className="text-sm leading-6 text-slate-700">
                Your registration is complete. Request your next consultation in
                just a few details.
              </p>
            </div>
          </section>

          <section className="relative -mt-4 mt-auto flex max-h-[78svh] shrink-0 flex-col rounded-t-[34px] border border-slate-100 bg-[#f8fafc] px-5 pb-4 pt-6 shadow-[0_-18px_45px_-35px_rgba(2,6,23,0.55)] sm:max-h-[80svh] sm:px-7 sm:pt-7 md:max-h-[80dvh]">
            <div className="overflow-y-auto pb-3 pr-1">
              <AppointmentForm
                userId={userId}
                patientId={patient.$id}
                type="create"
              />
            </div>

            <footer className="flex items-center justify-center border-t border-slate-200/90 pt-3 text-xs text-slate-500 sm:text-sm">
              © 2026 YoGo Healthcare
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
};

export default NewAppointment;
