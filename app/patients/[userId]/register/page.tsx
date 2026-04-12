import { getUser } from "@/actions/patient.action";
import { notFound } from "next/navigation";
import RegisterFlow from "@/components/form/RegisterFlow";

const RegisterPage = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  return <RegisterFlow user={user} />;
};

export default RegisterPage;
