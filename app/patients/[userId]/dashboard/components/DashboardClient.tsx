"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Appointment } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import { cn, formatDateTime } from "@/lib/utils";

import AppointmentCard from "./AppointmentCard";
import {
  DashboardStatusFilter,
  getStatusBadgeClassName,
  statusFilters,
  statusLabelByValue,
} from "./status";

interface DashboardClientProps {
  userId: string;
  appointments: Appointment[];
  hasPatientProfile: boolean;
}

const DashboardClient = ({
  userId,
  appointments,
  hasPatientProfile,
}: DashboardClientProps) => {
  const [activeFilter, setActiveFilter] = useState<DashboardStatusFilter>("all");
  const primaryActionHref = hasPatientProfile
    ? `/patients/${userId}/new-appointment`
    : `/patients/${userId}/register`;
  const primaryActionLabel = hasPatientProfile
    ? "New Appointment"
    : "Complete Registration";

  const statusCounts = useMemo(() => {
    return appointments.reduce(
      (acc, appointment) => {
        acc[appointment.status] += 1;
        return acc;
      },
      {
        pending: 0,
        schedule: 0,
        cancel: 0,
      } as Record<Status, number>
    );
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    const now = Date.now();

    return [...appointments]
      .filter(
        (appointment) =>
          appointment.status !== "cancel" &&
          new Date(appointment.schedule).getTime() >= now
      )
      .sort(
        (a, b) =>
          new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
      )[0];
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") {
      return appointments;
    }

    return appointments.filter((appointment) => appointment.status === activeFilter);
  }, [activeFilter, appointments]);

  const hasAppointments = appointments.length > 0;
  const hasFilteredAppointments = filteredAppointments.length > 0;
  const activeFilterName =
    activeFilter === "all"
      ? "all"
      : activeFilter === "schedule"
        ? "scheduled"
        : statusLabelByValue[activeFilter].toLowerCase();

  return (
    <div className="space-y-5 pb-24 md:pb-8">
      <section className="hidden md:flex md:justify-end">
        <Button
          asChild
          className="h-10 rounded-xl bg-sky-700 px-4 text-white hover:bg-sky-800"
        >
          <Link href={primaryActionHref}>{primaryActionLabel}</Link>
        </Button>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
              Next Appointment
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Your closest upcoming visit.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {appointments.length} total
          </span>
        </div>

        {nextAppointment ? (
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatDateTime(nextAppointment.schedule).dateTime}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Dr. {nextAppointment.doctor}
                </p>
              </div>

              <span className={getStatusBadgeClassName(nextAppointment.status)}>
                {statusLabelByValue[nextAppointment.status]}
              </span>
            </div>

            <p className="line-clamp-2 text-sm text-slate-600">
              Reason: {nextAppointment.reason}
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-xl border-slate-300"
              >
                <Link
                  href={`/patients/${userId}/dashboard/${nextAppointment.$id}`}
                  prefetch
                >
                  View Details
                </Link>
              </Button>
              <Button
                asChild
                className="h-10 rounded-xl bg-sky-700 text-white hover:bg-sky-800"
              >
                <Link href={primaryActionHref}>{primaryActionLabel}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4">
            <p className="text-sm text-slate-700">
              {hasPatientProfile
                ? "No upcoming appointment right now. Book one in less than a minute."
                : "Your account is found. Complete registration to request a new appointment."}
            </p>
            <Button
              asChild
              className="h-10 w-full rounded-xl bg-sky-700 text-white hover:bg-sky-800 sm:w-auto"
            >
              <Link href={primaryActionHref}>{primaryActionLabel}</Link>
            </Button>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900">History</h2>
          <p className="text-xs text-slate-500">
            {hasFilteredAppointments
              ? `${filteredAppointments.length} result${
                  filteredAppointments.length > 1 ? "s" : ""
                }`
              : "No results"}
          </p>
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {statusFilters.map((option) => {
            const count =
              option.value === "all"
                ? appointments.length
                : statusCounts[option.value];
            const isActive = activeFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setActiveFilter(option.value)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                )}
              >
                <span>{option.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {!hasAppointments ? (
          <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              No appointments yet
            </p>
            <p className="text-sm text-slate-600">
              Start by creating your first appointment request.
            </p>
            <Button
              asChild
              className="h-10 w-full rounded-xl bg-sky-700 text-white hover:bg-sky-800 sm:w-auto"
            >
              <Link href={primaryActionHref}>{primaryActionLabel}</Link>
            </Button>
          </div>
        ) : hasFilteredAppointments ? (
          <div className="space-y-3">
            {filteredAppointments.map((item) => (
              <AppointmentCard key={item.$id} appointment={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              No {activeFilterName} appointments found
            </p>
            <p className="text-sm text-slate-600">
              Try another status filter to review your full appointment history.
            </p>
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl border-slate-300"
              onClick={() => setActiveFilter("all")}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-4 backdrop-blur md:hidden">
        <Button
          asChild
          className="h-11 w-full rounded-xl bg-sky-700 text-white hover:bg-sky-800"
        >
          <Link href={primaryActionHref}>{primaryActionLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardClient;
