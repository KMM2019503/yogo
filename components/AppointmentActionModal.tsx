"use client";

import { useState } from "react";

import { Appointment } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import AppointmentForm from "./form/AppointmentForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AppointmentActionModalProps {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
}

export const AppointmentActionModal = ({
  patientId,
  userId,
  appointment,
  type,
}: AppointmentActionModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize transition py-1 px-3 rounded-3xl ${
            type === "schedule"
              ? "text-green-500 hover:bg-green-600 hover:text-gray-200"
              : "text-red-700 hover:bg-red-600 hover:text-gray-200"
          }`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {type} Appointment Form
          </DialogTitle>
          {/* <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription> */}
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
