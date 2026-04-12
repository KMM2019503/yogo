import { CalendarRange, Filter } from "lucide-react";

import { getAllAppointments } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import { Badge } from "@/components/ui/badge";
import {
  CardFromShnc as Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ScheduleManageClient from "../components/ScheduleManageClient";

export const revalidate = 0;

const ScheduleManagePage = async () => {
  const appointmentsData = await getAllAppointments("all");
  const documents = ((appointmentsData?.documents as Appointment[]) ?? []).sort(
    (a, b) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime()
  );

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-base text-slate-900">
              Schedule Manage
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Manage appointment status updates and keep the booking queue clean.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-sky-200 bg-sky-50 text-sky-700">
              <CalendarRange className="mr-1 size-3.5" />
              Sorted By Newest Date
            </Badge>
            <Badge className="border-slate-200 bg-slate-100 text-slate-700">
              <Filter className="mr-1 size-3.5" />
              Search + Status Filters Enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Use this page to schedule or cancel appointments after reviewing
            patient details and requested times.
          </p>
        </CardContent>
      </Card>

      <ScheduleManageClient appointments={documents} />
    </div>
  );
};

export default ScheduleManagePage;
