"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface StatusBarPoint {
  name: string;
  value: number;
  fill: string;
}

const StackedBarGraph = ({ data }: { data: StatusBarPoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barCategoryGap={26}>
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
          cursor={{ fill: "#e2e8f0", fillOpacity: 0.35 }}
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "0.75rem",
          }}
          labelStyle={{ color: "#0f172a", fontWeight: 600 }}
        />
        <Bar dataKey="value" radius={[10, 10, 0, 0]} minPointSize={6}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarGraph;
