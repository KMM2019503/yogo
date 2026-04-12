import type { ComponentType } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FileUploader } from "@/components/FileUploader";
import { GenderType, IdentificationTypes } from "@/constants";
import { cn } from "@/lib/utils";

import { registerFieldStyles } from "./config";
import type { RegisterFormValues, RegisterStepId } from "./types";

interface StepFieldsProps {
  form: UseFormReturn<RegisterFormValues>;
}

interface RegisterStepContentProps extends StepFieldsProps {
  stepId: RegisterStepId;
}

type ConsentFieldName =
  | "treatmentConsent"
  | "disclosureConsent"
  | "privacyConsent";

type ConsentOption = {
  name: ConsentFieldName;
  label: string;
  description: string;
};

const consentOptions: ConsentOption[] = [
  {
    name: "treatmentConsent",
    label: "I consent to receive treatment for my health condition.",
    description: "Required to proceed with appointment booking.",
  },
  {
    name: "disclosureConsent",
    label:
      "I consent to the use and disclosure of my health information for treatment purposes.",
    description: "Required for doctors and staff to coordinate your care.",
  },
  {
    name: "privacyConsent",
    label: "I acknowledge that I have reviewed and agree to the privacy policy.",
    description: "Required before we can finalize your profile.",
  },
];

const stepComponents: Record<RegisterStepId, ComponentType<StepFieldsProps>> = {
  user: UserStepFields,
  userInfo: UserInfoStepFields,
  medical: MedicalStepFields,
  verification: VerificationStepFields,
  consent: ConsentStepFields,
};

const RegisterStepContent = ({ stepId, form }: RegisterStepContentProps) => {
  const StepComponent = stepComponents[stepId];

  return <StepComponent form={form} />;
};

function UserStepFields({ form }: StepFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          Previous User Info
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Phone, name, and email are prefilled from your account.
        </p>
      </div>

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
                className={cn(
                  registerFieldStyles.input,
                  registerFieldStyles.disabledInput
                )}
                disabled
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  className={cn(
                    registerFieldStyles.input,
                    registerFieldStyles.disabledInput
                  )}
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  disabled
                  defaultCountry="MM"
                  country="MM"
                  placeholder="+95 998 273 4891"
                  international
                  withCountryCallingCode
                  value={field.value as string}
                  onChange={field.onChange}
                  className={registerFieldStyles.phoneInput}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function UserInfoStepFields({ form }: StepFieldsProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Date of Birth
            </FormLabel>
            <FormControl>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Select your date of birth"
                className={registerFieldStyles.dateInput}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Gender
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-3 md:grid-cols-4"
              >
                {GenderType.map((gender) => {
                  const isSelected = field.value === gender.value;

                  return (
                    <FormItem
                      key={gender.value}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-3 py-2 transition-colors",
                        isSelected
                          ? "border-sky-300 bg-sky-50"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value={gender.value}
                            className="border-slate-400 text-sky-600 focus-visible:ring-sky-500"
                          />
                        </FormControl>
                        <span className="text-sm font-medium text-slate-700">
                          {gender.label}
                        </span>
                      </div>
                      <gender.icon className="size-5 text-slate-500" />
                    </FormItem>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Occupation
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Civil Engineer"
                  className={registerFieldStyles.input}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Address
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Eg: Yangon, Sule, 31 street, no (616), 4th floor"
                  className={registerFieldStyles.textarea}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          control={form.control}
          name="emergencyContactName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Emergency Contact Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Guardian's Name"
                  className={registerFieldStyles.input}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContactNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Emergency Contact Number
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
                  className={registerFieldStyles.phoneInput}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function MedicalStepFields({ form }: StepFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          control={form.control}
          name="insuranceProvider"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Insurance Provider Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: IGG life insurance"
                  className={registerFieldStyles.input}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insurancePolicyNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-slate-700">
                Insurance Policy Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: IGG435Y873"
                  className={registerFieldStyles.input}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="allergies"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Allergies (if any)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Eg: foods, animals, pollen, mold, dust mites, medications, latex, insect stings"
                className={registerFieldStyles.textarea}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currentMedication"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Current Medication (if any)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Eg: Paracetamol 500mg, Pain reliever 500 mg"
                className={registerFieldStyles.textarea}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function VerificationStepFields({ form }: StepFieldsProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="indentificationType"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Identification Document Type
            </FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={registerFieldStyles.input}>
                  <SelectValue placeholder="Select Identification Doc Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {IdentificationTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="indentificationNumber"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Identification Number
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Eg: ERT95873659274"
                className={registerFieldStyles.input}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="indentificationDocument"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              Identification Document
            </FormLabel>
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function ConsentStepFields({ form }: StepFieldsProps) {
  return (
    <div className="space-y-4">
      {consentOptions.map((consent) => (
        <FormField
          key={consent.name}
          control={form.control}
          name={consent.name}
          render={({ field }) => (
            <FormItem className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-slate-400 checked:border-sky-700 checked:bg-sky-700"
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="cursor-pointer text-sm font-medium text-slate-700">
                    {consent.label}
                  </FormLabel>
                  <p className="text-xs text-slate-500">{consent.description}</p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}

export default RegisterStepContent;
