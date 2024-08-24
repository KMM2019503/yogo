import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import React from "react";

interface DetailProps {
  appointment: Appointment;
}

const Detail = ({ appointment }: DetailProps) => {
  return (
    <div className="w-full border py-3 px-4 rounded-lg mt-3">
      <h4 className="text-lg ">Appointment Detail</h4>
      <Separator className="my-2" />
      <div className="flex flex-col md:flex-row justify-around">
        <div>
          <p className="font-mono">
            {formatDateTime(appointment?.schedule).dateTime}
          </p>
          <p className="font-mono">Reason : {appointment?.reason}</p>
          {appointment?.note && (
            <p className="font-mono">Note : {appointment?.note}</p>
          )}
        </div>

        <Separator orientation="vertical" />

        <div>
          <p className="font-mono">Doctor {appointment?.doctor}</p>
          <p className="font-mono">Patient : {appointment?.patient?.name}</p>
          <p className="font-mono">{appointment?.status}</p>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="md:mx-4">
        {appointment?.cancellationReason && <p>Cancellation Reason</p>}
        <p>{appointment?.cancellationReason}</p>
      </div>
    </div>
  );
};

export default Detail;
