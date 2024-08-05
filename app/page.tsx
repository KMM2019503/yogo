import PatientForm from "@/components/form/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex items-center gap-5 mb-12">
            <Image
              src={"/yogo-logo.jpeg"}
              alt="logo"
              width={1000}
              height={1000}
              className="h-16 w-fit rounded-full"
            />
            <h2 className="font-mono text-3xl md:text-4xl lg:text-6xl font-bold text-yogo-primary">
              YoGo
            </h2>
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p>© 2024 YoGo -X- Piniaz</p>

            <Link href={"/?admin=true"} className="text-red-700">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/images/patientFormBg.jpg"}
        alt="patient form background"
        width={1000}
        height={1000}
        className="hidden md:block md:max-w-[40%] h-full lg:max-w-[50%] object-cover rounded-tl-2xl rounded-bl-2xl shadow-lg "
      />
    </div>
  );
}
