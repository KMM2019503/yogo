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
import { UserFromValidation } from "@/lib/validation";
import { createUser } from "@/actions/patient.action";

const PatientForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFromValidation>>({
    resolver: zodResolver(UserFromValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFromValidation>) {
    setLoading(true);

    try {
      const userData = { name, email, phone };
      console.log(userData);
      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <section className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Patient Sign In
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Enter your details to continue to appointment scheduling.
          </p>
        </section>

        {/* User Name */}
        <FormField
          control={form.control}
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
        {/* Email */}
        <FormField
          control={form.control}
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

        {/* Phone Number */}
        <FormField
          control={form.control}
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
          Use your own contact details only. This portal is intended for secure
          patient access.
        </p>
      </form>
    </Form>
  );
};

export default PatientForm;
