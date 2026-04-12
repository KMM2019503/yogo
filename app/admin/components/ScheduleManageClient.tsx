"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Appointment } from "@/types/appwrite.types";
import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { scheduleColumns } from "./schedule-columns";

type StatusFilter = "all" | Appointment["status"];

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Scheduled", value: "schedule" },
  { label: "Cancelled", value: "cancel" },
];

const ScheduleManageClient = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredAppointments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return appointments
      .filter((appointment) => {
        const matchesStatus =
          statusFilter === "all" || appointment.status === statusFilter;

        if (!matchesStatus) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const matchesText =
          appointment.patient.name.toLowerCase().includes(normalizedQuery) ||
          appointment.doctor.toLowerCase().includes(normalizedQuery) ||
          appointment.reason.toLowerCase().includes(normalizedQuery);

        return matchesText;
      })
      .sort(
        (a, b) =>
          new Date(b.schedule).getTime() - new Date(a.schedule).getTime()
      );
  }, [appointments, query, statusFilter]);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <CardTitle className="text-base text-slate-900">
              Appointment Queue
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Search by patient, doctor, or reason. Status filters apply in real
              time.
            </p>
          </div>
          <Badge className="w-fit border-slate-200 bg-slate-100 text-slate-700">
            {filteredAppointments.length} result
            {filteredAppointments.length === 1 ? "" : "s"}
          </Badge>
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative w-full xl:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patient, doctor, or reason..."
              className="h-11 border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statusFilters.map((item) => {
              const isActive = statusFilter === item.value;

              return (
                <Button
                  key={item.value}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setStatusFilter(item.value)}
                  className={
                    isActive
                      ? "bg-sky-700 text-white hover:bg-sky-800"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          data={filteredAppointments}
          columns={scheduleColumns}
          pageSize={8}
          emptyMessage="No appointments match this filter."
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleManageClient;
