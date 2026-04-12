import { Button } from "@/components/ui/button";
import { cn, formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import Link from "next/link";
import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import {
  getStatusBadgeClassName,
  getStatusIconClassName,
  statusLabelByValue,
} from "./status";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const statusIcon = {
    pending: FaCalendarDay,
    cancel: FaCalendarTimes,
    schedule: FaCalendarCheck,
  }[appointment.status];

  const StatusIcon = statusIcon;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-800 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className={getStatusBadgeClassName(appointment.status)}>
          {statusLabelByValue[appointment.status]}
        </span>
        <p className="text-xs text-slate-500">
          {formatDateTime(appointment.schedule).dateOnly}
        </p>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-900">
        {formatDateTime(appointment.schedule).timeOnly}
      </p>

      <p className="mt-1 text-sm text-slate-600">Dr. {appointment.doctor}</p>

      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
        Reason: {appointment.reason}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <StatusIcon
          className={cn("size-4", getStatusIconClassName(appointment.status))}
        />
        <span>{statusLabelByValue[appointment.status]} appointment</span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {formatDateTime(appointment.schedule).dateTime}
      </p>

      <Button
        variant={"outline"}
        className="mt-4 h-10 w-full rounded-xl border-slate-300 font-medium hover:bg-slate-100"
        asChild
      >
        <Link
          href={`/patients/${appointment.userId}/dashboard/${appointment.$id}`}
          prefetch
        >
          View Detail
        </Link>
      </Button>
    </article>
  );
};

export default AppointmentCard;
