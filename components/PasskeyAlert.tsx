"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { usePathname, useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { decryptKey, encryptKey } from "@/lib/utils";

export function PasskeyAlert() {
  const router = useRouter();
  const pathName = usePathname();
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  const [passCode, setPassCode] = useState("");

  const accessCode =
    typeof window !== "undefined"
      ? window.localStorage.getItem("AdminAccessCode")
      : null;

  useEffect(() => {
    const prePassCode = accessCode && decryptKey(accessCode);
    if (pathName) {
      if (prePassCode === process.env.NEXT_PUBLIC_ADMIN_PASS_CODE) {
        setShowDialog(false);
        router.push("/admin");
      } else {
        setShowDialog(true);
      }
    } else {
    }
  }, [accessCode, pathName, router]);

  const onClose = () => {
    setShowDialog(false);
    router.push("/");
  };

  const onContinue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passCode === process.env.NEXT_PUBLIC_ADMIN_PASS_CODE) {
      const encryptCode = encryptKey(passCode);

      localStorage.setItem("AdminAccessCode", encryptCode);

      setShowDialog(false);
      router.push("/admin");
    } else {
      setError("Invalid passcode");
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <p className="font-mono font-bold text-xl">Admin Verfication</p>
            <CgClose className="cursor-pointer size-5" onClick={onClose} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To confirm that you are an administrator, enter the passcode.
          </AlertDialogDescription>

          <div>
            <InputOTP
              maxLength={6}
              value={passCode}
              onChange={(value) => setPassCode(value)}
            >
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error mt-3 flex justify-center">{error}</p>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => onContinue(e)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PasskeyAlert;
