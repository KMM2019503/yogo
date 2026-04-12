"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

interface LineGraphPoint {
  name: string;
  total: number;
}

const chartConfig = {
  total: {
    label: "Requests",
    color: "#0284c7",
  },
} satisfies ChartConfig;

const LineGraph = ({ data }: { data: LineGraphPoint[] }) => {
  const safeData = data.map((item) => ({
    name: item.name,
    total: Number(item.total) || 0,
  }));
  const maxTotal = Math.max(...safeData.map((item) => item.total), 0);

  return (
    <ChartContainer config={chartConfig} className="h-[185px] w-full">
      <AreaChart data={safeData} margin={{ left: 4, right: 10, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="appointmentArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#e2e8f0"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          domain={[0, Math.max(1, maxTotal)]}
        />
        <Tooltip
          cursor={{ stroke: "#0ea5e9", strokeOpacity: 0.25 }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "0.75rem",
          }}
          labelStyle={{ color: "#0f172a", fontWeight: 600 }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="var(--color-total)"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#appointmentArea)"
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default LineGraph;
