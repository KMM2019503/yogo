import { MonitorX } from "lucide-react";

import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased">
      <section className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center md:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <MonitorX className="mx-auto size-10 text-slate-700" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Desktop Required
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Admin Is Desktop-First
          </h2>
          <p className="max-w-sm text-sm text-slate-600">
            Please switch to a tablet or desktop screen to access the admin
            dashboard and schedule management pages.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen max-md:hidden">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1 overflow-hidden p-4 xl:p-5">{children}</main>
        </div>
      </section>
    </div>
  );
}
