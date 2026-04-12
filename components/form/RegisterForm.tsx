"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { registerPatient } from "@/actions/patient.action";
import { PatientFormValidation } from "@/lib/validation";
import { PatientFormDefaultValues } from "@/constants";

import RegisterStepActions from "./register/RegisterStepActions";
import RegisterStepContent from "./register/RegisterStepContent";
import { registerSteps } from "./register/config";
import type { RegisterFormProps, RegisterFormValues } from "./register/types";

export { registerSteps } from "./register/config";

const createIdentificationDocumentData = (documents?: File[]) => {
  if (!documents || documents.length === 0) {
    return undefined;
  }

  const [document] = documents;
  const formData = new FormData();

  formData.append("blobFile", new Blob([document], { type: document.type }));
  formData.append("fileName", document.name);

  return formData;
};

const RegisterForm = ({ user, activeStep, setActiveStep }: RegisterFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const currentStep = registerSteps[activeStep] ?? registerSteps[0];
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === registerSteps.length - 1;

  const handleNextStep = async () => {
    const isStepValid = await form.trigger(currentStep.fields, {
      shouldFocus: true,
    });

    if (!isStepValid) {
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, registerSteps.length - 1));
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFormKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter" || isLastStep) {
      return;
    }

    const target = event.target as HTMLElement;
    const isTextArea = target.tagName === "TEXTAREA";

    if (isTextArea) {
      return;
    }

    event.preventDefault();
    void handleNextStep();
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);

    try {
      const patientData: RegisterUserParams = {
        ...values,
        userId: user.$id,
        dob: new Date(values.dob),
        indentificationDocument: createIdentificationDocumentData(
          values.indentificationDocument
        ),
        allergies: values.allergies ?? undefined,
        currentMedication: values.currentMedication ?? undefined,
        indentificationType: values.indentificationType ?? undefined,
        indentificationNumber: values.indentificationNumber ?? undefined,
      };

      const patient = await registerPatient(patientData);

      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={handleFormKeyDown}
        className="w-full space-y-5"
      >
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Patient Registration
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {currentStep.title}
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              {currentStep.description}
            </p>
          </header>

          <RegisterStepContent stepId={currentStep.id} form={form} />

          <RegisterStepActions
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            loading={loading}
            onBack={handlePreviousStep}
            onNext={handleNextStep}
          />

          <p className="text-xs leading-5 text-slate-500">
            Please review each step carefully. You can go back anytime before
            finishing registration.
          </p>
        </section>
      </form>
    </Form>
  );
};

export default RegisterForm;
