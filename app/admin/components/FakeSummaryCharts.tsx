"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const weeklyTrendData = [
  { day: "Mon", admissions: 24 },
  { day: "Tue", admissions: 28 },
  { day: "Wed", admissions: 26 },
  { day: "Thu", admissions: 33 },
  { day: "Fri", admissions: 31 },
  { day: "Sat", admissions: 22 },
  { day: "Sun", admissions: 19 },
];

const departmentData = [
  { name: "ER", count: 38 },
  { name: "Cardio", count: 27 },
  { name: "Pediatrics", count: 23 },
  { name: "Oncology", count: 19 },
];

const statusMixData = [
  { key: "admitted", name: "Admitted", value: 58 },
  { key: "observation", name: "Observation", value: 27 },
  { key: "discharged", name: "Discharged", value: 15 },
];

const trendChartConfig = {
  admissions: {
    label: "Admissions",
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

const departmentChartConfig = {
  count: {
    label: "Patients",
    color: "#10b981",
  },
} satisfies ChartConfig;

const statusChartConfig = {
  admitted: {
    label: "Admitted",
    color: "#0fdaf5",
  },
  observation: {
    label: "Observation",
    color: "#f59e0b",
  },
  discharged: {
    label: "Discharged",
    color: "#10b981",
  },
} satisfies ChartConfig;

const FakeSummaryCharts = () => {
  return (
    <div className="grid gap-2">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="space-y-0.5 p-3">
          <CardTitle className="text-xs font-semibold text-slate-900">
            Daily Admissions Trend
          </CardTitle>
          <CardDescription className="text-[11px] text-slate-500">
            Mock inpatient admissions by day
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2 pt-0">
          <ChartContainer config={trendChartConfig} className="h-24 w-full">
            <LineChart
              data={weeklyTrendData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip cursor={false} />
              <Line
                dataKey="admissions"
                type="monotone"
                stroke="#0fdaf5"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="space-y-0.5 p-3">
          <CardTitle className="text-xs font-semibold text-slate-900">
            Department Census
          </CardTitle>
          <CardDescription className="text-[11px] text-slate-500">
            Mock active patients by unit
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2 pt-0">
          <ChartContainer config={departmentChartConfig} className="h-24 w-full">
            <BarChart
              data={departmentData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip cursor={false} />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                fill="#0fdaf5"
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="space-y-0.5 p-3">
          <CardTitle className="text-xs font-semibold text-slate-900">
            Patient Status Mix
          </CardTitle>
          <CardDescription className="text-[11px] text-slate-500">
            Mock inpatient status distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 px-2 pb-2 pt-0">
          <ChartContainer config={statusChartConfig} className="h-24 w-1/2">
            <PieChart>
              <ChartTooltip cursor={false} />
              <Pie
                data={statusMixData}
                dataKey="value"
                nameKey="name"
                innerRadius={22}
                outerRadius={38}
                paddingAngle={3}
              >
                {statusMixData.map((item) => (
                  <Cell key={item.key} fill={`var(--color-${item.key})`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex-1 space-y-1">
            {statusMixData.map((item) => (
              <div key={item.key} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: `var(--color-${item.key})` }}
                  />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeSummaryCharts;
