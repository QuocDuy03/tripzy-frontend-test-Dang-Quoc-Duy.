import { Person } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { IFormInputs } from "@/app/types";

interface PassengerSelectorProps {
  control: Control<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
}

export function PassengerSelector({ control, errors }: PassengerSelectorProps) {
  return (
    <div className="w-fit">
      <label className="text-xs font-semibold text-gray-600 block mb-2 leading-4.5">
        PASSENGERS
      </label>
      <Controller
        name="passengers"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              width: "100px",
              "& .MuiInputBase-root": {
                paddingLeft: "6px",
              },
            }}
            type="number"
            size="small"
            slotProps={{
              htmlInput: {
                min: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            error={!!errors.passengers}
            helperText={errors.passengers?.message}
          />
        )}
      />
    </div>
  );
}
