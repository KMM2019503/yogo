import IconBadge from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import Link from "next/link";
import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <div className="border rounded-lg px-4 py-3 text-dark-700">
      <div className="flex justify-start items-center gap-4">
        {appointment.status === "pending" ? (
          <>
            <FaCalendarDay className="size-8 md:size-12 lg:size-9 text-orange-500" />
            <p className="text-xl md:text-2xl font-mono font-bold ">Pending</p>
          </>
        ) : appointment.status === "cancel" ? (
          <>
            <FaCalendarTimes className="size-8 md:size-12 lg:size-9 text-red-700" />
            <p className="text-xl md:text-2xl font-mono font-bold ">
              Cancelled
            </p>
          </>
        ) : (
          <>
            <FaCalendarCheck className="size-8 md:size-12 lg:size-9 text-green-400" />
            <p className="text-xl md:text-2xl font-mono font-bold ">
              Scheduled
            </p>
          </>
        )}
      </div>

      <p className="mt-2 text-gray-200 text-lg">
        {formatDateTime(appointment.schedule).dateTime}
      </p>

      <p className="mt-2 text-gray-200 text-sm">
        Reason : {appointment.reason}
      </p>

      <Button
        variant={"outline"}
        className="w-full hover:bg-dark-500 mt-2"
        asChild
      >
        <Link
          href={`/patients/${appointment.userId}/dashboard/${appointment.$id}`}
        >
          Detail
        </Link>
      </Button>
    </div>
  );
};

export default AppointmentCard;
