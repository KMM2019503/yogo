import { getAppointment } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Detail from "./components/Detail";
import SorryAnimation from "./components/SorryAnimation";
import ScheduleAnimation from "./components/ScheduleAnimation";
import PendingAnimation from "./components/PendingAnimation";

export const revalidate = 0;

const AppointmentDetail = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: string };
}) => {
  const appointment: Appointment = await getAppointment(appointmentId);

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
          <p className="text-center font-bold">
            We&apos;re sorry, but your appointment has been canceled for some
            reason.
          </p>
        );
      case "pending":
        return (
          <p className="text-center font-bold">
            Your appointment is currently pending. We&apos;ll notify you once
            it&apos;s confirmed.
          </p>
        );
      default:
        return (
          <p className="text-center font-bold">
            Your appointment has been confirmed. We look forward to seeing you.
          </p>
        );
    }
  };

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex flex-col justify-center items-center gap-y-1 mb-5">
            <Image
              src="/yogo-logo.jpeg"
              alt="logo"
              width={1000}
              height={1000}
              className="h-16 w-fit rounded-full"
            />
          </div>

          {renderAnimation()}
          {renderMessage()}

          <Detail appointment={appointment} />

          <div className="text-14-regular mt-20 flex items-center justify-between md:gap-y-4">
            <p>© 2024 YoGo -X- Piniaz</p>
            <Button asChild variant="outline">
              <Link href={`/patients/${appointment?.userId}/dashboard`}>
                Go Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentDetail;
