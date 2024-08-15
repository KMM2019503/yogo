import PatientForm from "@/components/form/PatientForm";
import PasskeyAlert from "@/components/PasskeyAlert";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.isAdmin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyAlert />}
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px]">
          <div className="flex flex-col justify-center items-center gap-y-1 mb-10">
            <Image
              src={"/yogo-logo.jpeg"}
              alt="logo"
              width={1000}
              height={1000}
              className="h-16 w-fit rounded-full"
            />
            {/* <h2 className="font-mono text-3xl md:text-4xl lg:text-6xl font-bold ">
              YoGo
            </h2> */}
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between md:gap-y-4">
            <p>© 2024 YoGo -X- Piniaz</p>

            <Link href={"/?isAdmin=true"} className="text-red-700">
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
