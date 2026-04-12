import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  ClipboardList,
} from "lucide-react";

import { getAllAppointments } from "@/actions/appointment.action";
import { ConvertLineGraphData, ConvertStatusGraphData } from "@/lib/graphData";
import { Appointment } from "@/types/appwrite.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardFromShnc as Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LineGraph from "./components/LineGraph";
import StackedBarGraph from "./components/StackedBarGraph";

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

  const lineGraphData = ConvertLineGraphData(documents);
  const statusChartData = ConvertStatusGraphData({
    scheduledCount,
    pendingCount,
    cancelledCount,
  });

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
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge className={card.accentClass}>{card.title}</Badge>
                  <span className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <Icon className="size-4 text-slate-700" />
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{card.helper}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 2xl:grid-cols-5">
        <Card className="border-slate-200 bg-white shadow-sm 2xl:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-900">
              Monthly Request Trend
            </CardTitle>
            <CardDescription>
              Real appointment requests grouped by month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineGraph data={lineGraphData} />
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm 2xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-900">
              Status Distribution
            </CardTitle>
            <CardDescription>
              Scheduled, pending, and cancelled appointment volumes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StackedBarGraph data={statusChartData} />
            <div className="grid grid-cols-3 gap-2">
              {statusChartData.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="text-xs font-medium text-slate-500">{item.name}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base text-slate-900">
                Manage Appointments
              </CardTitle>
              <CardDescription>
                Open schedule management for filtering and appointment actions.
              </CardDescription>
            </div>
            <Button asChild className="bg-sky-700 text-white hover:bg-sky-800">
              <Link href="/admin/schedule-manage">
                Go To Schedule Manage
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
};

export default AdminPage;
