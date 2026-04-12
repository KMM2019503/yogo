"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

const titleByPathname: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/schedule-manage": "Schedule Management",
};

const AdminTopbar = () => {
  const pathname = usePathname();

  const title = useMemo(() => {
    if (titleByPathname[pathname]) {
      return titleByPathname[pathname];
    }

    if (pathname.startsWith("/admin/schedule-manage")) {
      return titleByPathname["/admin/schedule-manage"];
    }

    return "Admin Workspace";
  }, [pathname]);

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    []
  );

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 px-6 py-2 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-slate-900">{title}</h1>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <ShieldCheck className="size-4" />
          <span>{dateLabel}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
