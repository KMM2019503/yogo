import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient",
    header: "Patient Name",
    cell: ({ row }) => <p>{row.original.patient.name}</p>,
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.status === "pending" ? (
          <div className="flex items-center gap-2">
            <MdOutlinePendingActions className="size-5 text-orange-400" />
            <p className="text-base font-mono ">Pending</p>
          </div>
        ) : row.original.status === "cancel" ? (
          <div className="flex items-center gap-2">
            <MdOutlineCancel className="size-5 text-red-700" />
            <p>Cancelled</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaCalendarCheck className="size-5 text-green-400" />
            <p>Scheduled</p>
          </div>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CiMenuKebab className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-dark-200">
            <DropdownMenuItem onClick={() => {}}>Schedule</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  // {
  //   accessorKey: "isPaid",
  //   header: "Paid",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.isPaid ? (
  //         <BiSolidMessageSquareCheck className="size-6 text-green-500" />
  //       ) : (
  //         <BiSolidMessageSquareX className="size-6 text-red-500" />
  //       )}
  //     </div>
  //   ),
  // },
];
