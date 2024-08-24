import { Appointment } from "@/types/appwrite.types";

export const ConvertLineGraphData = (appointments: Appointment[]) => {
  console.log("🚀 ~ ConvertLineGraphData ~ appointments:", appointments);

  const monthMap: { [key: string]: number } = {
    JAN: 0,
    FEB: 0,
    MAR: 0,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  };

  appointments.forEach((appointment) => {
    const month = new Date(appointment.schedule)
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    if (monthMap[month] !== undefined) {
      monthMap[month]++;
    }
  });

  const result = Object.keys(monthMap).map((month) => ({
    name: month,
    total: monthMap[month],
  }));

  console.log("🚀 ~ ConvertLineGraphData ~ result:", result);

  return result;
};
