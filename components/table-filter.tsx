"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define types for filter configuration
type FilterType = "text" | "select" | "date";

export interface FilterField {
  name: string;
  label: string;
  type: FilterType;
  options?: { value: string; label: string }[]; // For select fields
  placeholder?: string;
}

interface TableFilterProps {
  filters: FilterField[];
}

export const TableFilter = ({
  filters,
}: // onFilter,
TableFilterProps) => {
  // Use form state to detect if the form is dirty for enabling/disabling reset
  //   const { isDirty } = useFormState({ control });
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="mb-4 text-xl text-center">Filter By</p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <FormField
                  key={filter.name}
                  control={control}
                  name={filter.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{filter.label}</FormLabel>
                      <FormControl>
                        {filter.type === "text" ? (
                          <Input
                            placeholder={
                              filter.placeholder || `Enter ${filter.label}`
                            }
                            {...field}
                            onChange={({ target: { value } }) => {
                              field.onChange(value ? value : undefined);
                            }}
                            // value={field.value ?? undefined}
                          />
                        ) : filter.type === "select" ? (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={field.disabled}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={
                                  filter.placeholder || `Select ${filter.label}`
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {filter.options?.length ? (
                                filter.options.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="" disabled>
                                  No options available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        ) : filter.type === "date" ? (
                          <div className="text-red-500">
                            Date filter not implemented yet
                          </div> // Placeholder: Add date picker later
                        ) : null}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {/* <Button variant={"outline"} onClick={() => reset()}>
              Clear
            </Button> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
