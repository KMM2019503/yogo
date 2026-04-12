"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarClock, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/schedule-manage",
    label: "Schedule Manage",
    icon: CalendarClock,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-slate-200/80 bg-white/90 px-5 py-6">
      <div className="mb-10 flex items-center gap-3px-3 py-2">
        <Image
          src="/yogo-logo.jpeg"
          alt="YoGo logo"
          width={42}
          height={42}
          className="rounded-full border border-slate-200 object-cover"
        />
        <div>
          <p className="text-sm font-medium tracking-[0.12em] text-slate-500">
            YOGO
          </p>
          <p className="text-base font-semibold text-slate-900">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-sky-200 bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
