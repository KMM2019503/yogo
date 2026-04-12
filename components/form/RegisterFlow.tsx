"use client";

import React, { useState } from "react";

import RegisterForm from "@/components/form/RegisterForm";
import { registerSteps } from "@/components/form/register/config";
import { cn } from "@/lib/utils";

const RegisterFlow = ({ user }: { user: User }) => {
  const [activeStep, setActiveStep] = useState(0);
  const visibleWindowStart = activeStep >= 2 ? 2 : 0;
  const visibleSteps = registerSteps.slice(visibleWindowStart, visibleWindowStart + 3);
  const connectorProgress =
    visibleSteps.length > 1
      ? Math.min(
          100,
          Math.max(
            0,
            ((activeStep - visibleWindowStart) / (visibleSteps.length - 1)) *
              100
          )
        )
      : 0;

  return (
    <main className="relative h-[100svh] overflow-hidden bg-slate-200 md:h-[100dvh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.52),_rgba(186,230,253,0.88)_44%,_rgba(224,242,254,1)_82%)]" />

      <div className="relative mx-auto h-full w-full max-w-[640px] md:px-4 md:py-5">
        <div className="flex h-full flex-col md:overflow-hidden md:rounded-[36px] md:border md:border-slate-300/70 md:bg-white/20 md:shadow-[0_26px_70px_-40px_rgba(2,132,199,0.55)]">
          <section className="relative shrink-0 overflow-hidden px-5 pb-10 pt-6 sm:px-7 sm:pb-12 sm:pt-8">
            <div className="relative z-10 py-1 sm:py-2">
              <div className="relative pt-0.5">
                <div className="absolute left-[16%] right-[16%] top-4 h-1 rounded-full bg-slate-300/80">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${connectorProgress}%` }}
                  />
                </div>

                <ol className="relative z-10 grid grid-cols-3 gap-2">
                  {visibleSteps.map((step, index) => {
                    const actualIndex = visibleWindowStart + index;
                    const isActive = actualIndex === activeStep;
                    const isDone = actualIndex < activeStep;

                    return (
                      <li
                        key={step.id}
                        className="flex min-w-0 flex-col items-center gap-2 text-center"
                      >
                        <div
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full text-base font-semibold transition-colors",
                            isActive && "bg-indigo-600 text-white",
                            isDone && "bg-indigo-600 text-white",
                            !isActive && !isDone && "bg-slate-300/90 text-slate-700"
                          )}
                        >
                          {actualIndex + 1}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-semibold sm:text-sm",
                            isActive ? "text-slate-900" : "text-slate-600"
                          )}
                        >
                          {step.title}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </section>

          <section className="relative -mt-4 mt-auto flex max-h-[78svh] shrink-0 flex-col rounded-t-[34px] border border-slate-100 bg-[#f8fafc] px-5 pb-4 pt-6 shadow-[0_-18px_45px_-35px_rgba(2,6,23,0.55)] sm:max-h-[80svh] sm:px-7 sm:pt-7 md:max-h-[80dvh]">
            <div className="overflow-y-auto pb-3 pr-1">
              <RegisterForm
                user={user}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
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

export default RegisterFlow;
