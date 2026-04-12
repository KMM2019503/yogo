import React from "react";
import Header from "./components/Header";
import { getPatient, getUser } from "@/actions/patient.action";
import { getAppointmentsByUserId } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import { notFound, redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";

export const revalidate = 0;

const PatientDashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const [user, patient, appointmentData] = await Promise.all([
    getUser(userId),
    getPatient(userId),
    getAppointmentsByUserId(userId),
  ]);

  if (!user || !appointmentData) {
    notFound();
  }

  const appointments = appointmentData.documents as Appointment[];
  const hasAppointments = appointments.length > 0;
  const hasPatientProfile = Boolean(patient);

  if (!hasPatientProfile && !hasAppointments) {
    redirect(`/patients/${userId}/register`);
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header user={user} />
      <main className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
        <DashboardClient
          userId={userId}
          appointments={appointments}
          hasPatientProfile={hasPatientProfile}
        />
      </main>
    </div>
  );
};

export default PatientDashboard;
