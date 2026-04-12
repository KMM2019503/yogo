"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Appointment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AppointmentActionModal } from "@/components/AppointmentActionModal";

const statusStyles: Record<
  Appointment["status"],
  { label: string; className: string }
> = {
  schedule: {
    label: "Scheduled",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  cancel: {
    label: "Cancelled",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
};

export const scheduleColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-slate-900">{row.original.patient.name}</p>
        <p className="text-xs text-slate-500">{row.original.patient.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <p className="font-medium text-slate-700">{row.original.doctor}</p>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <p className="max-w-[18rem] truncate text-slate-600" title={row.original.reason}>
        {row.original.reason}
      </p>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Date & Time",
    cell: ({ row }) => (
      <p className="text-sm text-slate-700">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statusStyles[row.original.status];

      return <Badge className={status.className}>{status.label}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <AppointmentActionModal
          type="schedule"
          patientId={row.original.patient.$id}
          userId={row.original.userId}
          appointment={row.original}
        />
        <AppointmentActionModal
          type="cancel"
          patientId={row.original.patient.$id}
          userId={row.original.userId}
          appointment={row.original}
        />
      </div>
    ),
  },
];
