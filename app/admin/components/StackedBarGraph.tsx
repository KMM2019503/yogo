"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const StackedBarGraph = ({ data }: { data: any[] }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" stackId="a" fill="#8884d8" />
          <Bar dataKey="scheduled" stackId="a" fill="#82ca9d" />
          <Bar dataKey="pending" stackId="a" fill="#ffc658" />
          <Bar dataKey="cancelled" stackId="a" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default StackedBarGraph;
