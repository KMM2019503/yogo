"use client";

import { DataTable } from "@/components/DataTable";
import { Appointment } from "@/types/appwrite.types";
import React from "react";
import { columns } from "./Column";

interface AppointmentDataTabelProps {
  appointments: Appointment[];
}

const AppointmentDataTabel = ({ appointments }: AppointmentDataTabelProps) => {
  return (
    <div>
      <DataTable data={appointments} columns={columns} />
    </div>
  );
};

export default AppointmentDataTabel;
