import { Clock3, UserCheck, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const queueSnapshot = [
  { label: "Avg Triage Time", value: "9 min", icon: Clock3 },
  { label: "Patients Seen", value: "42", icon: UserCheck },
  { label: "Patients Waiting", value: "14", icon: Users },
];

const sourceBreakdown = [
  { label: "Emergency Dept", value: 38, color: "bg-sky-500" },
  { label: "Clinic Referral", value: 34, color: "bg-emerald-500" },
  { label: "Telehealth Follow-up", value: 28, color: "bg-amber-500" },
];

const careTeamLoad = [
  { label: "ICU Beds Occupied", load: 82 },
  { label: "General Beds Occupied", load: 71 },
  { label: "Step-down Beds Occupied", load: 64 },
];

const FakeCompactDashboardCards = () => {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm font-semibold text-slate-900">
            Today Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3 pt-0">
          {queueSnapshot.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-slate-200 bg-white p-1">
                    <Icon className="size-3.5 text-slate-700" />
                  </span>
                  <p className="text-xs font-medium text-slate-600">{item.label}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm font-semibold text-slate-900">
            Patient Intake Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 p-3 pt-0">
          {sourceBreakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <p className="font-medium text-slate-600">{item.label}</p>
                <p className="font-semibold text-slate-900">{item.value}%</p>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div
                  className={`h-1.5 rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeCompactDashboardCards;
