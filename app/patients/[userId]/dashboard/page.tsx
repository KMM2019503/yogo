import React from "react";
import Header from "./components/Header";
import { getUser } from "@/actions/patient.action";
import { getAppointmentsByUserId } from "@/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";
import AppointmentCard from "./components/AppointmentCard";

export const revalidate = 0;

const PatientDashboard = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await getUser(userId);
  const appointmentData = await getAppointmentsByUserId(userId);
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
