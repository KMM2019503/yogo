import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/actions/appointment.action";
import { notFound } from "next/navigation";

import { FaCalendarCheck } from "react-icons/fa";

const RequestSuccess = async ({
  searchParams,
  params,
}: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const { userId } = await params;
  const appointmentId = (resolvedSearchParams?.appointmentId as string) || "";
  if (!appointmentId) {
    notFound();
  }

  const appointment = await getAppointment(appointmentId);
  if (!appointment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/40 px-4 py-6 sm:px-6 sm:py-8">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/yogo-logo.jpeg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-11 w-fit rounded-full"
          />
        </Link>

        <section className="flex flex-col items-center gap-2 text-center">
          <Image
            src="/gif/successful.gif"
            height={100}
            width={100}
            alt="success"
          />
          <h2 className="mb-3 max-w-[600px] text-xl text-slate-800">
            The request you made for an appointment has been submitted
            successfully.
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            We&apos;ll get in contact to confirm soon.
          </p>
        </section>

        <section className="request-details">
          <p className="text-sm font-medium text-slate-700 sm:text-base">
            Requested appointment details:
          </p>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <p className="whitespace-nowrap">Dr. {appointment.doctor}</p>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FaCalendarCheck className="text-green-400 size-6" />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href={`/patients/${userId}/dashboard`}>Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            className="shad-primary-btn w-full sm:w-auto"
            asChild
          >
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>

        <p className="copyright">© 2026 YoGo</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
