import { cn } from "@/lib/utils";

export type DashboardStatusFilter = "all" | Status;

export const statusFilters: Array<{
  value: DashboardStatusFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "schedule", label: "Scheduled" },
  { value: "cancel", label: "Cancelled" },
];

export const statusLabelByValue: Record<Status, string> = {
  pending: "Pending",
  schedule: "Scheduled",
  cancel: "Cancelled",
};

const statusToneByValue: Record<
  Status,
  {
    badge: string;
    icon: string;
  }
> = {
  pending: {
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    icon: "text-orange-500",
  },
  schedule: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "text-emerald-500",
  },
  cancel: {
    badge: "border-red-200 bg-red-50 text-red-700",
    icon: "text-red-600",
  },
};

export const getStatusBadgeClassName = (status: Status) =>
  cn(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
    statusToneByValue[status].badge
  );

export const getStatusIconClassName = (status: Status) =>
  statusToneByValue[status].icon;
