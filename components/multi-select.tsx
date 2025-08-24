import { Controller } from "react-hook-form";
import { MultiSelect, MultiSelectProps } from "@/components/ui/multi-select";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface MultiSelectFormProps
  extends Omit<MultiSelectProps, "onValueChange" | "defaultValue"> {
  name: string; // Name of the field in the form
  control?: any; // Optional control prop (if not using FormProvider),
  label?: string;
}

const RHFMultiSelectForm = ({
  name,
  control,
  label,
  ...props
}: MultiSelectFormProps) => {
  return (
    <div className={cn("flex flex-col flex-grow w-full", {})}>
      {label && <Label className={cn("mb-4")}>{label}</Label>}
      <Controller
        name={name}
        control={control} // Use passed control or context control
        render={({ field, fieldState: { error } }) => (
          <div>
            <MultiSelect
              {...props}
              defaultValue={field.value || []} // Set default value from form state
              onValueChange={(value: any) => field.onChange(value)} // Update form state on change
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p> // Display error message
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RHFMultiSelectForm;
