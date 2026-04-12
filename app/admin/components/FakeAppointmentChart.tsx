"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataPoint = {
  month: string;
  encounters: number;
};

const fakeAppointmentData: ChartDataPoint[] = [
  { month: "Jan", encounters: 124 },
  { month: "Feb", encounters: 138 },
  { month: "Mar", encounters: 131 },
  { month: "Apr", encounters: 146 },
  { month: "May", encounters: 152 },
  { month: "Jun", encounters: 148 },
];

const FakeAppointmentChart = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Monthly Patient Encounters (Mock Data)
        </h3>
        <p className="text-xs text-slate-500">
          Simulated encounter counts across departments.
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={fakeAppointmentData}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis tick={{ fontSize: 12, fill: "#475569" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="encounters"
              stroke="#0369A1"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#0369A1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FakeAppointmentChart;
