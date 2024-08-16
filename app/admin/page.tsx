import { getAllAppointments } from "@/actions/appointment.action";

import Card from "@/components/Card";
import AppointmentDataTabel from "@/components/dataTabel/appointment/AppointmentDataTabel";
import { Appointment } from "@/types/appwrite.types";
import React from "react";

import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const AdminPage = async () => {
  const appointments: Appointment[] = (await getAllAppointments("all")) || [];

  const pendingAppointments: Appointment[] =
    (await getAllAppointments("pending")) || [];

  const cancelledAppointments: Appointment[] =
    (await getAllAppointments("cancel")) || [];

  return (
    <div className="px-[7%] md:px-[6%] ">
      {/* analysis */}
      <section className="grid justify-center grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-3 md:gap-y-0">
        <Card
          Icon={FaCalendarCheck}
          number={appointments.length}
          title="Total Number of Appointment"
          iconColor="text-green-400"
        />
        <Card
          Icon={MdOutlinePendingActions}
          number={pendingAppointments.length}
          title="Total Number of Appointment Pending"
          iconColor="text-yellow-400"
        />
        <Card
          Icon={MdOutlineCancel}
          number={cancelledAppointments.length}
          title="Total Number of Appointment Cancelled"
          iconColor="text-red-500"
        />
      </section>
      {/* data tabel */}
      <section className="px-5 mt-10">
        <AppointmentDataTabel appointments={appointments} />
      </section>
    </div>
  );
};

export default AdminPage;
