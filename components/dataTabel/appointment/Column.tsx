"use client";

import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";

import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import IconBadge from "@/components/IconBadge";
import { AppointmentActionModal } from "@/components/AppointmentActionModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient",
    header: "Patient Name",
    cell: ({ row }) => <p>{row.original.patient.name}</p>,
  },
  {
    accessorKey: "schedule",
    header: "Date/Time",
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.status === "pending" ? (
          <IconBadge
            Icon={MdOutlinePendingActions}
            text="Pending"
            iconColor="text-orange-400"
          />
        ) : row.original.status === "cancel" ? (
          <IconBadge
            Icon={MdOutlineCancel}
            text="Cancelled"
            iconColor="text-red-700"
          />
        ) : (
          <IconBadge
            Icon={FaCalendarCheck}
            text="Scheduled"
            iconColor="text-green-400"
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
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
      );
    },
  },
];
