import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import React from "react";
import { getStatusBadgeClassName, statusLabelByValue } from "../../components/status";

interface DetailProps {
  appointment: Appointment;
}

const Detail = ({ appointment }: DetailProps) => {
  const patientName =
    typeof appointment.patient === "string"
      ? "Patient"
      : appointment.patient?.name ?? "Patient";

  return (
    <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <h4 className="text-base font-semibold text-slate-800 sm:text-lg">
        Appointment Detail
      </h4>
      <Separator className="my-3" />
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1 text-sm text-slate-700 sm:text-base">
          <p className="font-sans">
            {formatDateTime(appointment?.schedule).dateTime}
          </p>
          <p className="font-sans">Reason: {appointment?.reason}</p>
          {appointment?.note && (
            <p className="font-sans">Note: {appointment?.note}</p>
          )}
        </div>

        <Separator className="md:hidden" />
        <Separator orientation="vertical" className="hidden h-auto md:block" />

        <div className="space-y-1 text-sm text-slate-700 sm:text-base">
          <p className="font-sans">Doctor: {appointment?.doctor}</p>
          <p className="font-sans">Patient: {patientName}</p>
          <p>
            <span className={getStatusBadgeClassName(appointment.status)}>
              {statusLabelByValue[appointment.status]}
            </span>
          </p>
        </div>
      </div>
      {appointment?.cancellationReason && (
        <>
          <Separator className="my-3" />
          <div className="space-y-1 md:mx-2">
            <p className="text-sm font-semibold text-slate-700">
              Cancellation Reason
            </p>
            <p className="text-sm text-slate-600 sm:text-base">
              {appointment.cancellationReason}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
