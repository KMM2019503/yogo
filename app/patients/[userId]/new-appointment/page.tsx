import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/form/AppointmentForm";
import { getPatient } from "@/actions/patient.action";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container md:max-w-[500px]">
          <div className="flex flex-col justify-center items-center gap-y-1 mb-10">
            <Image
              src={"/yogo-logo.jpeg"}
              alt="logo"
              width={1000}
              height={1000}
              className="h-16 w-fit rounded-full"
            />
          </div>
          <h1 className="text-xl font-mono font-bold text-gray-200">
            Hi {patient.name}
          </h1>

          <AppointmentForm
            userId={userId}
            patientId={patient.userId}
            type="create"
          />

          <div className="text-14-regular mt-10 flex justify-center md:gap-y-4">
            <p className="text-xs text-muted-foreground">
              © 2024 YoGo -X- Piniaz
            </p>
          </div>
        </div>
      </section>
      <Image
        src={"/images/appointment-form.jpg"}
        alt="patient form background"
        width={1000}
        height={1000}
        className="hidden md:block md:max-w-[20%] h-full object-cover rounded-tl-2xl rounded-bl-2xl shadow-lg "
      />
    </div>
  );
};

export default NewAppointment;
