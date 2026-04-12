import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  ClipboardList,
} from "lucide-react";

import { getAllAppointments } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardFromShnc as Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export const revalidate = 0;

const AdminPage = async () => {
  const appointmentsData = await getAllAppointments("all");

  const {
    totalCount = 0,
    scheduledCount = 0,
    pendingCount = 0,
    cancelledCount = 0,
    documents = [],
  } = (appointmentsData ?? {}) as {
    totalCount: number;
    scheduledCount: number;
    pendingCount: number;
    cancelledCount: number;
    documents: Appointment[];
  };

  const statCards = [
    {
      title: "Total Appointments",
      value: totalCount,
      helper: "All requests in the system",
      icon: ClipboardList,
      accentClass: "bg-sky-50 text-sky-700",
    },
    {
      title: "Scheduled",
      value: scheduledCount,
      helper: "Confirmed bookings",
      icon: CalendarCheck2,
      accentClass: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Pending",
      value: pendingCount,
      helper: "Waiting for review",
      icon: CalendarClock,
      accentClass: "bg-amber-50 text-amber-700",
    },
    {
      title: "Cancelled",
      value: cancelledCount,
      helper: "Declined appointments",
      icon: CalendarX2,
      accentClass: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <section className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Today
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Admin Snapshot
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="h-8 bg-sky-700 text-white hover:bg-sky-800"
        >
          <Link href="/admin/schedule-manage">
            Manage Schedule
            <ArrowRight className="ml-1.5 size-3.5" />
          </Link>
        </Button>
      </section>

      <section className="grid grid-cols-4 gap-3">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between gap-3">
                  <Badge className={`text-[10px] ${card.accentClass}`}>
                    {card.title}
                  </Badge>
                  <span className="rounded-lg border border-slate-200 bg-slate-50 p-1.5">
                    <Icon className="size-3.5 text-slate-700" />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-2xl font-semibold tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{card.helper}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default AdminPage;
