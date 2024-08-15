import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/actions/appointment.action";

import { FaCalendarCheck } from "react-icons/fa";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/yogo-logo.jpeg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 rounded-full w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/gif/successful.gif"
            height={100}
            width={100}
            alt="success"
          />
          <h2 className="text-xl mb-6 max-w-[600px] text-center">
            The request you made for an appointment has been submitted
            successfully.
          </h2>
          <p>We&apos;ll get in contact to confirm soon.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap">Dr. {appointment.doctor}</p>
          </div>
          <div className="flex gap-2">
            <FaCalendarCheck className="text-green-400 size-6" />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 YoGo </p>
      </div>
    </div>
  );
};

export default RequestSuccess;
