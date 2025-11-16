import { Search } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { IFormInputs, ILocation } from "@/app/types";
import { LocationSelector } from "./LocationSelector";
import { DateSelector } from "./DateSelector";
import { PassengerSelector } from "./PassengerSelector";
import { Dayjs } from "dayjs";
import { Control, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";

interface SearchFormProps {
  control: Control<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  watch: UseFormWatch<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
  locations: ILocation[];
  currentMonth: Dayjs;
  onMonthChange: (direction: "prev" | "next") => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function SearchForm({
  control,
  errors,
  watch,
  setValue,
  locations,
  currentMonth,
  onMonthChange,
  onSubmit,
}: SearchFormProps) {
  const handleSwapLocations = useCallback(() => {
    const from = watch("from");
    const to = watch("to");
    setValue("from", to);
    setValue("to", from);
  }, [watch, setValue]);

  return (
    <form className="w-full mx-auto" onSubmit={onSubmit}>
      <Box
        display="flex"
        gap={1}
        alignItems="start"
        justifyContent="space-between"
      >
        <LocationSelector
          control={control}
          locations={locations}
          errors={errors}
          onSwap={handleSwapLocations}
        />
        <DateSelector
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
          currentMonth={currentMonth}
          onMonthChange={onMonthChange}
        />
        <PassengerSelector 
          control={control} 
          errors={errors} 
        />
      </Box>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          startIcon={<Search />}
          sx={{
            width: "200px",
            backgroundColor: "#19C0FF",
            color: "#fff",
          }}
          className="rounded-full! mx-auto! my-5!"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
