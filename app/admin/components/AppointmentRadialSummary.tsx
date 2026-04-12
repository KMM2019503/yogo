"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import {
  CardFromShnc as Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AppointmentRadialSummaryProps = {
  totalAppointments: number;
  scheduledAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
};

const AppointmentRadialSummary = ({
  totalAppointments,
  scheduledAppointments,
  pendingAppointments,
  cancelledAppointments,
}: AppointmentRadialSummaryProps) => {
  const completionRate =
    totalAppointments > 0
      ? Math.round((scheduledAppointments / totalAppointments) * 100)
      : 0;

  const chartData = [{ metric: "completion", value: completionRate, fill: "#0284C7" }];

  return (
    <Card className="h-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="items-center space-y-0.5 px-3.5 pb-0.5 pt-3">
        <CardTitle className="text-xs font-semibold text-slate-900">
          Scheduling Completion
        </CardTitle>
        <CardDescription className="text-[10px] text-slate-500">
          Current status from total appointments
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2.5 pb-0">
        <div className="mx-auto h-[148px] w-full max-w-[168px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              endAngle={-270}
              innerRadius={42}
              outerRadius={63}
              startAngle={90}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                polarRadius={[58, 48]}
              />
              <RadialBar dataKey="value" background cornerRadius={8} />
              <PolarRadiusAxis
                axisLine={false}
                tick={false}
                tickLine={false}
                domain={[0, 100]}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-slate-900 text-2xl font-bold"
                          >
                            {completionRate}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 14}
                            className="fill-slate-500 text-[10px]"
                          >
                            Scheduled
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-0.5 px-3.5 pb-3 pt-1.5 text-[11px]">
        <div className="flex items-center gap-1 leading-none font-semibold text-slate-900">
          {scheduledAppointments} of {totalAppointments} scheduled{" "}
          <TrendingUp className="h-3 w-3 text-sky-600" />
        </div>
        <div className="leading-none text-slate-500 text-[10px]">
          Pending: {pendingAppointments} | Cancelled: {cancelledAppointments}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentRadialSummary;
