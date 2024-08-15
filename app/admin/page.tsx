import Card from "@/components/Card";
import React from "react";

import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const AdminPage = () => {
  return (
    <div className="px-[7%] md:px-[6%] ">
      {/* analysis */}
      <section className="grid justify-center grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-3 md:gap-y-0">
        <Card
          Icon={FaCalendarCheck}
          number={40}
          title="Total Number of Appointment"
          iconColor="text-green-400"
        />
        <Card
          Icon={MdOutlinePendingActions}
          number={22}
          title="Total Number of Appointment Pending"
          iconColor="text-yellow-400"
        />
        <Card
          Icon={MdOutlineCancel}
          number={18}
          title="Total Number of Appointment Cancelled"
          iconColor="text-red-500"
        />
      </section>
    </div>
  );
};

export default AdminPage;
