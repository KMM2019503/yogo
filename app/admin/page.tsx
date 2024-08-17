import { getAllAppointments } from "@/actions/appointment.action";

import Card from "@/components/Card";
import AppointmentDataTabel from "@/components/dataTabel/appointment/AppointmentDataTabel";
import React from "react";

export const revalidate = 0;

import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const AdminPage = async () => {
  const {
    totalCount,
    scheduledCount,
    pendingCount,
    cancelledCount,
    documents,
  } = await getAllAppointments("all");

  return (
    <div className="px-[7%] md:px-[6%] ">
      {/* analysis */}
      <section className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-10 gap-y-3 md:gap-y-4 lg:gap-y-0">
        <Card
          Icon={FaCalendarAlt}
          number={totalCount}
          title="Total Number of Appointment"
          iconColor="text-yogo-primary"
        />
        <Card
          Icon={FaCalendarCheck}
          number={scheduledCount}
          title="Total Number of Scheduled Appointments"
          iconColor="text-green-400"
        />
        <Card
          Icon={FaCalendarDay}
          number={pendingCount}
          title="Total Number of Appointment Pending"
          iconColor="text-yellow-400"
        />
        <Card
          Icon={FaCalendarTimes}
          number={cancelledCount}
          title="Total Number of Appointment Cancelled"
          iconColor="text-red-500"
        />
      </section>
      {/* data tabel */}
      <section className="mt-10">
        <AppointmentDataTabel appointments={documents} />
      </section>
    </div>
  );
};

export default AdminPage;
