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
import { PatientFormValidation } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GenderType,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";

import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FileUploader } from "../FileUploader";
import { Checkbox } from "../ui/checkbox";
import { registerPatient } from "@/actions/patient.action";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setLoading(true);
    let formData;
    if (
      values.indentificationDocument &&
      values.indentificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.indentificationDocument[0]], {
        type: values.indentificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.indentificationDocument[0].name);
    }
    try {
      const patientData: RegisterUserParams = {
        ...values,
        userId: user.$id,
        dob: new Date(values.dob),
        indentificationDocument: values.indentificationDocument
          ? formData
          : undefined,
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
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-yogo-primary">
          Hello, this is Register Form
        </h2>

        {/* Personal Information */}
        <section className="space-y-10">
          <h2 className="sub-header">Personal Information</h2>
        </section>
        {/* User Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Mical Jordan" {...field} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="micaljordan@gmail.com"
                    {...field}
                    disabled={true}
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
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={true}
                    defaultCountry="MM"
                    country="MM"
                    placeholder="+95 998 273 4891"
                    international
                    withCountryCallingCode
                    value={field.value as string}
                    onChange={field.onChange}
                    className="flex h-10 w-full rounded-md border border-input bg-dark-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* DoB */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2">
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Select your date of birth"
                  // yearDropdownItemNumber={30}
                  // scrollableYearDropdown
                  // showYearDropdown
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-4"
                >
                  {GenderType.map((gender) => (
                    <FormItem
                      key={gender.value}
                      className="flex items-center justify-around border rounded-md px-3 md:px-4 py-2 "
                    >
                      <FormControl>
                        <RadioGroupItem value={gender.value} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex items-center">
                        {gender.label}
                        <gender.icon className="size-6" />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5">
          {/* Occupation */}
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Eg : Civil Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="address">Address</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Eg : Yangon, Sule, 31 street, no (616), 4th floor"
                    id="address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5">
          {/* Emergency Contact Name */}
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Guardian's Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Emergency Contact Number */}
          <FormField
            control={form.control}
            name="emergencyContactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="emergencyContactNumber">
                  Emergency Contact Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    id="emergencyContactNumber"
                    defaultCountry="MM"
                    country="MM"
                    placeholder="+95 998 273 4891"
                    international
                    withCountryCallingCode
                    value={field.value as string}
                    onChange={field.onChange}
                    className="flex h-10 w-full rounded-md border border-input bg-dark-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Medical Information */}
        <section className="space-y-10">
          <h2 className="sub-header">Medical Information</h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5">
          {/* Insurance Provider Name */}
          <FormField
            control={form.control}
            name="insuranceProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Provider Name</FormLabel>
                <FormControl>
                  <Input placeholder="Eg : IGG life insurance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Insurance Policy Number */}
          <FormField
            control={form.control}
            name="insurancePolicyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Policy Number</FormLabel>
                <FormControl>
                  <Input placeholder="Eg : IGG435Y873" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Allergies */}
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Allergies (if any)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Eg : foods, animals, pollen, mold, dust mites, medications, latex, insect stings"
                  id="address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="currentMedication"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">
                Current Medication (if any)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Eg : Paracetamol 500mg, Pain reliever 500 mg"
                  id="address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* Identification & Verification */}
        <section className="space-y-10">
          <h2 className="sub-header">Identification & Verification</h2>
        </section>

        {/* Identification Document Type */}
        <FormField
          control={form.control}
          name="indentificationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Document Type</FormLabel>
              <FormMessage />
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Identification Doc Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-300 ">
                    <SelectGroup>
                      {IdentificationTypes.map((item, i) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Identification Number */}
        <FormField
          control={form.control}
          name="indentificationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Number</FormLabel>
              <FormControl>
                <Input placeholder="Eg : ERT95873659274" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Identification Document */}
        <FormField
          control={form.control}
          name="indentificationDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Document</FormLabel>
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        {/* Identification & Verification */}
        <section className="space-y-10">
          <h2 className="sub-header">Consent & Privacy</h2>
        </section>
        <FormField
          control={form.control}
          name="treatmentConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I consent to receive treatment for my health condition.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disclosureConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I consent to the use disclosure of my health information for
                  treatment purposes.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I acknowledge that I have reviewed and agree to privacy
                  policy.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <SubmitButton isLoading={loading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
