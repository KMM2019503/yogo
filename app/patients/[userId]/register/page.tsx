import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/actions/patient.action";

const RegisterPage = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container md:max-w-[896px]">
          <div className="flex flex-col justify-center items-center gap-y-1 mb-10">
            <Image
              src={"/yogo-logo.jpeg"}
              alt="logo"
              width={1000}
              height={1000}
              className="h-16 w-fit rounded-full"
            />
          </div>

          <RegisterForm user={user} />

          <div className="text-14-regular mt-10 flex justify-center md:gap-y-4">
            <p>© 2024 YoGo -X- Piniaz</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
