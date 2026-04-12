import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/SubmitButton";
import { cn } from "@/lib/utils";

interface RegisterStepActionsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  loading: boolean;
  onBack: () => void;
  onNext: () => Promise<void>;
}

const RegisterStepActions = ({
  isFirstStep,
  isLastStep,
  loading,
  onBack,
  onNext,
}: RegisterStepActionsProps) => {
  return (
    <div className="flex items-center gap-3 pt-2">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 rounded-xl border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-100"
          disabled={loading}
        >
          Back
        </Button>
      )}

      {isLastStep ? (
        <SubmitButton
          isLoading={loading}
          className="h-11 flex-1 rounded-xl bg-sky-700 text-white shadow-sm transition-colors hover:bg-sky-800 focus-visible:ring-sky-500"
        >
          Complete Registration
        </SubmitButton>
      ) : (
        <Button
          type="button"
          onClick={() => void onNext()}
          className={cn(
            "h-11 rounded-xl bg-sky-700 text-white shadow-sm transition-colors hover:bg-sky-800 focus-visible:ring-sky-500",
            isFirstStep ? "w-full" : "flex-1"
          )}
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default RegisterStepActions;
