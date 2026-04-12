import { getAppointment } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Detail from "./components/Detail";
import SorryAnimation from "./components/SorryAnimation";
import ScheduleAnimation from "./components/ScheduleAnimation";
import PendingAnimation from "./components/PendingAnimation";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import { getUser } from "@/actions/patient.action";
import { getStatusBadgeClassName, statusLabelByValue } from "../components/status";

export const revalidate = 0;

const AppointmentDetail = async ({
  params,
}: {
  params: Promise<{ userId: string; appointmentId: string }>;
}) => {
  const { appointmentId, userId } = await params;
  const [appointmentData, user] = await Promise.all([
    getAppointment(appointmentId),
    getUser(userId),
  ]);

  if (!appointmentData || !user || appointmentData.userId !== userId) {
    notFound();
  }

  const appointment = appointmentData as Appointment;

  const renderAnimation = () => {
    switch (appointment?.status) {
      case "cancel":
        return <SorryAnimation />;
      case "pending":
        return <PendingAnimation />;
      default:
        return <ScheduleAnimation />;
    }
  };

  const renderMessage = () => {
    switch (appointment?.status) {
      case "cancel":
        return (
          <p className="text-center text-sm font-bold sm:text-base">
            We&apos;re sorry, but your appointment has been canceled for some
            reason.
          </p>
        );
      case "pending":
        return (
          <p className="text-center text-sm font-bold sm:text-base">
            Your appointment is currently pending. We&apos;ll notify you once
            it&apos;s confirmed.
          </p>
        );
      default:
        return (
          <p className="text-center text-sm font-bold sm:text-base">
            Your appointment has been confirmed. We look forward to seeing you.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header user={user} />
      <main className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-7">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                Appointment Status
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
                {statusLabelByValue[appointment.status]}
              </h1>
            </div>
            <span className={getStatusBadgeClassName(appointment.status)}>
              {statusLabelByValue[appointment.status]}
            </span>
          </div>

          <div className="pt-1">{renderAnimation()}</div>
          <div>{renderMessage()}</div>
        </section>

        <Detail appointment={appointment} />

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-10 w-full rounded-xl border-slate-300"
          >
            <Link href={`/patients/${appointment.userId}/dashboard`}>
              Back to Dashboard
            </Link>
          </Button>
          <Button
            asChild
            className="h-10 w-full rounded-xl bg-sky-700 text-white hover:bg-sky-800"
          >
            <Link href={`/patients/${appointment.userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AppointmentDetail;
