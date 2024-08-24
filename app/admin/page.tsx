import { getAllAppointments } from "@/actions/appointment.action";

import Card from "@/components/Card";
import AppointmentDataTabel from "@/components/dataTabel/appointment/AppointmentDataTabel";
import React from "react";

export const revalidate = 0;

import { FaCalendarCheck, FaChartBar } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

import {
  CardFromShnc,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LineGraph from "./components/LineGraph";
import { Appointment } from "@/types/appwrite.types";
import { ConvertLineGraphData } from "@/lib/graphData";
import StackedBarGraph from "./components/StackedBarGraph";

const fakeData = [
  { name: "JAN", total: 85 },
  { name: "FEB", total: 72 },
  { name: "MAR", total: 94 },
  { name: "APR", total: 68 },
  { name: "MAY", total: 79 },
  { name: "JUN", total: 88 },
  { name: "JUL", total: 96 },
  { name: "AUG", total: 83 },
  { name: "SEP", total: 75 },
  { name: "OCT", total: 90 },
  { name: "NOV", total: 65 },
  { name: "DEC", total: 92 },
];

const AdminPage = async () => {
  const {
    totalCount,
    scheduledCount,
    pendingCount,
    cancelledCount,
    documents,
  } = await getAllAppointments("all");

  const LineGraphData = ConvertLineGraphData(documents);
  const StackedBarGraphData = [
    {
      name: "Total",
      total: totalCount,
      scheduled: scheduledCount,
      pending: pendingCount,
      cancelled: cancelledCount,
    },
  ];
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
          Icon={FaCalendarDay}
          number={pendingCount}
          title="Total Number of Appointment Pending"
          iconColor="text-yellow-400"
        />
        <Card
          Icon={FaCalendarCheck}
          number={scheduledCount}
          title="Total Number of Scheduled Appointments"
          iconColor="text-green-400"
        />
        <Card
          Icon={FaCalendarTimes}
          number={cancelledCount}
          title="Total Number of Appointment Cancelled"
          iconColor="text-red-500"
        />
      </section>

      {/* Graph & Chart */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardFromShnc className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Appointment Request Line Graph
            </CardTitle>
            <FaChartBar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <LineGraph data={LineGraphData} /> */}
            <LineGraph data={fakeData} />
          </CardContent>
        </CardFromShnc>

        <CardFromShnc className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Appointment Request Line Graph
            </CardTitle>
            <FaChartBar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <StackedBarGraph data={StackedBarGraphData} />
          </CardContent>
        </CardFromShnc>
      </section>

      {/* data tabel */}
      <section className="mt-10">
        <AppointmentDataTabel appointments={documents} />
      </section>
    </div>
  );
};

export default AdminPage;
