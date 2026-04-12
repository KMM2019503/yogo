"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface LineGraphPoint {
  name: string;
  total: number;
}

const LineGraph = ({ data }: { data: LineGraphPoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="appointmentArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
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
          stroke="#0284c7"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#appointmentArea)"
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
