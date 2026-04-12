"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// React Hook Form and zod
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import SubmitButton from "../ui/SubmitButton";
import { PhoneLookupValidation, UserFromValidation } from "@/lib/validation";
import { createUser, getUserByPhone } from "@/actions/patient.action";

type AuthStep = "lookup" | "new-user";

const PatientForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>("lookup");

  const lookupForm = useForm<z.infer<typeof PhoneLookupValidation>>({
    resolver: zodResolver(PhoneLookupValidation),
    defaultValues: {
      phone: "",
    },
  });

  const newUserForm = useForm<z.infer<typeof UserFromValidation>>({
    resolver: zodResolver(UserFromValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const routeToDashboard = (userId: string) => {
    router.push(`/patients/${userId}/dashboard`);
  };

  const routeToRegister = (userId: string) => {
    router.push(`/patients/${userId}/register`);
  };

  async function onLookupSubmit({
    phone,
  }: z.infer<typeof PhoneLookupValidation>) {
    setLoading(true);

    try {
      const normalizedPhone = phone.trim();
      const user = await getUserByPhone(normalizedPhone);

      if (user) {
        routeToDashboard(user.$id);
        return;
      }

      newUserForm.reset({
        name: "",
        email: "",
        phone: normalizedPhone,
      });
      setAuthStep("new-user");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function onNewUserSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFromValidation>) {
    setLoading(true);

    try {
      const normalizedPhone = phone.trim();
      const existingUser = await getUserByPhone(normalizedPhone);

      if (existingUser) {
        routeToDashboard(existingUser.$id);
        return;
      }

      const user = await createUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: normalizedPhone,
      });

      if (!user) {
        newUserForm.setError("email", {
          type: "manual",
          message: "We could not create this account right now.",
        });
        return;
      }

      const normalizedInputPhone = normalizedPhone;
      const normalizedUserPhone = (user.phone ?? "").trim();

      if (normalizedInputPhone !== normalizedUserPhone) {
        newUserForm.setError("email", {
          type: "manual",
          message: "This email is already linked to another phone number.",
        });
        return;
      }

      routeToRegister(user.$id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChangePhone = () => {
    const existingPhone = newUserForm.getValues("phone");
    lookupForm.reset({ phone: existingPhone });
    newUserForm.reset({ name: "", email: "", phone: existingPhone });
    setAuthStep("lookup");
  };

  if (authStep === "lookup") {
    return (
      <Form {...lookupForm}>
        <form
          onSubmit={lookupForm.handleSubmit(onLookupSubmit)}
          className="w-full space-y-5"
        >
          <section className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Patient Login
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Sign in with phone
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Enter your phone number. If it is new, we will ask for your name
              and email in the next step.
            </p>
          </section>

          <FormField
            control={lookupForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="MM"
                    country="MM"
                    placeholder="+95 998 273 4891"
                    international
                    withCountryCallingCode
                    value={field.value as string}
                    onChange={field.onChange}
                    className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            isLoading={loading}
            className="h-11 w-full rounded-xl bg-sky-700 text-white shadow-sm transition-colors hover:bg-sky-800 focus-visible:ring-sky-500"
          >
            Continue
          </SubmitButton>

          <p className="text-xs leading-5 text-slate-500">
            Use your own contact details only. This portal is intended for
            secure patient access.
          </p>
        </form>
      </Form>
    );
  }

  return (
    <Form {...newUserForm}>
      <form
        onSubmit={newUserForm.handleSubmit(onNewUserSubmit)}
        className="w-full space-y-5"
      >
        <section className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            New Patient
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Complete your details
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            We could not find this phone number. Please add your name and email
            to create your account.
          </p>
        </section>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Phone Number
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {newUserForm.watch("phone")}
          </p>
          <button
            type="button"
            onClick={handleChangePhone}
            className="mt-2 text-xs font-medium text-sky-700 transition-colors hover:text-sky-800"
          >
            Change phone number
          </button>
        </div>

        <FormField
          control={newUserForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Mical Jordan"
                  className="h-11 rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={newUserForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="micaljordan@gmail.com"
                  className="h-11 rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          isLoading={loading}
          className="h-11 w-full rounded-xl bg-sky-700 text-white shadow-sm transition-colors hover:bg-sky-800 focus-visible:ring-sky-500"
        >
          Create Account
        </SubmitButton>

        <p className="text-xs leading-5 text-slate-500">
          Use your own contact details only. This portal is intended for secure
          patient access.
        </p>
      </form>
    </Form>
  );
};

export default PatientForm;
