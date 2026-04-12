"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

interface StatusBarPoint {
  name: string;
  value: number;
  fill: string;
}

const chartConfig = {
  value: {
    label: "Appointments",
    color: "#0284c7",
  },
} satisfies ChartConfig;

const StackedBarGraph = ({ data }: { data: StatusBarPoint[] }) => {
  const safeData = data.map((item) => ({
    name: item.name,
    value: Number(item.value) || 0,
    fill: item.fill,
  }));
  const maxValue = Math.max(...safeData.map((item) => item.value), 0);

  return (
    <ChartContainer config={chartConfig} className="h-[185px] w-full">
      <BarChart data={safeData} barCategoryGap={26} margin={{ left: 4, right: 10, top: 8, bottom: 0 }}>
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
          domain={[0, Math.max(1, maxValue)]}
        />
        <Tooltip
          cursor={{ fill: "#e2e8f0", fillOpacity: 0.35 }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "0.75rem",
          }}
          labelStyle={{ color: "#0f172a", fontWeight: 600 }}
        />
        <Bar dataKey="value" radius={[10, 10, 0, 0]} minPointSize={6}>
          {safeData.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default StackedBarGraph;
