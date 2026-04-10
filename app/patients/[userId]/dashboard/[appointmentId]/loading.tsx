import Image from "next/image";

const AppointmentDetailLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src="/loading.svg" alt="Loading" width={48} height={48} />
    </div>
  );
};

export default AppointmentDetailLoading;
