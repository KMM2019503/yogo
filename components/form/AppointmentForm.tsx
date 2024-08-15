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

import "react-phone-number-input/style.css";

import SubmitButton from "../ui/SubmitButton";
import { getAppointmentSchema } from "@/lib/validation";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Doctors } from "@/constants";
import { Textarea } from "../ui/textarea";
import { createNewAppointment } from "@/actions/appointment.action";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: "create" | "cancle" | "schedule";
}

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      doctor: "",
      schedule: new Date(),
      note: "",
      reason: "",
      cancellationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "schedule";
        break;

      case "cancle":
        status = "cancel";
        break;

      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          doctor: values.doctor,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createNewAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(`Error in creating appointment : ${error}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 flex-1"
      >
        <section className="space-y-4">
          <p className="text-dark-700">Request your first appointment in 10s</p>
        </section>

        {type === "create" && (
          <>
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-300 ">
                        <SelectGroup>
                          {Doctors.map((item, i) => (
                            <SelectItem key={i} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reason">Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Eg : anual health checkup, blood test, general checkup"
                      id="reason"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="notes">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Eg : I don't live here, but I need help with my medication"
                      id="notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel>Appointment Date & Time</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      selected={field.value}
                      onChange={(date) => {
                        console.log(date);
                        field.onChange(date);
                      }}
                      dateFormat={"MM/dd/yyyy - h:mm aa"}
                      placeholderText="Date & Time"
                      showTimeSelect
                      showTimeInput
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {type === "cancle" && (
          <>
            <FormField
              control={form.control}
              name="cancellationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cancellationReason">
                    Cancellation Reason
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Eg : My doctor didn't show up, I don't need this appointment anymore"
                      id="cancellationReason"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <SubmitButton
          isLoading={loading}
          className={`${
            type !== "create" ? "bg-red-700" : "bg-yogo-dark"
          } mt-2`}
        >
          {type === "create" ? "Request New Appointment" : "Cancel Appointment"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
