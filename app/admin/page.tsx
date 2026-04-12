import {
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

import { getAllAppointments } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import FakeCompactDashboardCards from "@/app/admin/components/FakeCompactDashboardCards";
import FakeSummaryCharts from "@/app/admin/components/FakeSummaryCharts";
import { ChartAreaInteractive } from "./components/ChartRadialFake";

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
    },
    {
      title: "Scheduled",
      value: scheduledCount,
      helper: "Confirmed bookings",
      icon: CalendarCheck2,
    },
    {
      title: "Pending",
      value: pendingCount,
      helper: "Waiting for review",
      icon: CalendarClock,
    },
    {
      title: "Cancelled",
      value: cancelledCount,
      helper: "Declined appointments",
      icon: CalendarX2,
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <section className="grid gap-2 xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <div className="grid content-start gap-2">
          <div className="grid gap-2 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] xl:items-start">
            <div className="grid content-start gap-2">
              <Card className="h-fit overflow-hidden border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                  {statCards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                      <div key={card.title}>
                        <div className="flex items-center justify-between px-3 py-2.5 sm:px-3.5 sm:py-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className="rounded-md border border-slate-200 bg-slate-50 p-1">
                              <Icon className="size-3.5 text-slate-700" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
                                {card.title}
                              </p>
                              <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                                {card.helper}
                              </p>
                            </div>
                          </div>

                          <div className="ml-2.5 flex shrink-0 items-center gap-1 sm:gap-1.5">
                            <p className="text-xl font-semibold leading-none text-slate-900 sm:text-2xl">
                              {card.value}
                            </p>
                            <ChevronRight className="size-3.5 text-slate-400 sm:size-4" />
                          </div>
                        </div>

                        {index < statCards.length - 1 ? (
                          <div className="h-px bg-slate-100" />
                        ) : null}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="h-fit border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-2 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Operational Insight (Mock)
                  </p>

                  <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600">
                        Clinical Documentation Completion
                      </p>
                      <p className="text-sm font-semibold text-slate-900">88%</p>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">
                      <div className="h-1.5 w-[88%] rounded-full bg-[#0fdaf5]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center rounded-md">
                      <p className="text-slate-500">No-show Rate</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">7%</p>
                    </div>
                    <div className="flex items-center rounded-md">
                      <p className="text-slate-500">Follow-up</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">14%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="min-w-0">
              <ChartAreaInteractive />
            </div>
          </div>

          <FakeCompactDashboardCards />
        </div>

        <FakeSummaryCharts />
      </section>

      <Card className="h-fit border-slate-200 bg-white shadow-sm py-1 px-2">
        <p className="text-xs font-thin">
          A health dashboard is a data visualization tool that provides real-time insights for decision-making. It tracks key metrics, such as patient outcomes in clinical settings, system uptime in IT, or system health in cloud infrastructure, often displaying data via charts, graphs, and indicators.
        </p>
      </Card>
    </div>
  );
};

export default AdminPage;
