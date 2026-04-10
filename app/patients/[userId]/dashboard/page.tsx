import React from "react";
import Header from "./components/Header";
import { getUser } from "@/actions/patient.action";
import { getAppointmentsByUserId } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import AppointmentCard from "./components/AppointmentCard";
import { notFound } from "next/navigation";

export const revalidate = 0;

const PatientDashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const [user, appointmentData] = await Promise.all([
    getUser(userId),
    getAppointmentsByUserId(userId),
  ]);

  if (!user || !appointmentData) {
    notFound();
  }

  return (
    <div className="max-h-screen">
      <Header user={user} />
      <div className="px-[7%] md:px-[6%] pt-[2%] ">
        {/* Overview */}
        {/* Appointment Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 md:gap-x-4 lg:gap-x-3">
          {appointmentData.documents.map((item: Appointment) => (
            <div key={item.$id}>
              <AppointmentCard appointment={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
