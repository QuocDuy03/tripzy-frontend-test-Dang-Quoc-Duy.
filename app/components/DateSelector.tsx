import { CalendarMonth } from "@mui/icons-material";
import { TextField, InputAdornment, Checkbox } from "@mui/material";
import {
  Controller,
  Control,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { IFormInputs } from "@/app/types";
import { TwoMonthsPicker } from "./TwoMonthsPicker";

interface DateSelectorProps {
  control: Control<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  watch: UseFormWatch<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
  currentMonth: Dayjs;
  onMonthChange: (direction: "prev" | "next") => void;
}

export function DateSelector({
  control,
  errors,
  watch,
  setValue,
  currentMonth,
  onMonthChange,
}: DateSelectorProps) {
  const [anchorElDeparture, setAnchorElDeparture] =
    useState<HTMLElement | null>(null);
  const [anchorElReturn, setAnchorElReturn] = useState<HTMLElement | null>(
    null
  );

  return (
    <>
      <div className="w-full">
        <label className="text-xs font-semibold text-gray-600 block mb-2 leading-4.5">
          DEPARTURE DATE
        </label>
        <Controller
          name="departureDate"
          control={control}
          render={({ field }) => (
            <>
              <TextField
                size="small"
                placeholder="DD/MM/YYYY"
                fullWidth
                value={
                  field.value ? dayjs(field.value).format("DD/MM/YYYY") : ""
                }
                onClick={(e) => setAnchorElDeparture(e.currentTarget)}
                error={!!errors.departureDate}
                helperText={errors.departureDate?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    paddingLeft: "6px",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
              <TwoMonthsPicker
                open={Boolean(anchorElDeparture)}
                anchorEl={anchorElDeparture}
                onClose={() => setAnchorElDeparture(null)}
                currentMonth={currentMonth}
                minDate={dayjs()}
                onChange={(newDate) => {
                  field.onChange(newDate?.toISOString() || "");
                }}
                onMonthChange={onMonthChange}
              />
            </>
          )}
        />
      </div>

      <div className="w-full">
        <label className="text-xs font-semibold text-gray-600 block mb-2">
          <Checkbox
            checked={watch("isRoundTrip")}
            onChange={(e) => {
              setValue("isRoundTrip", e.target.checked);
              setValue("returnDate", null);
            }}
            color="primary"
            size="small"
            sx={{
              width: "12px",
              height: "12px",
              marginRight: "4px",
            }}
          />
          ROUND TRIP
        </label>
        <Controller
          name="returnDate"
          control={control}
          render={({ field }) => (
            <>
              <TextField
                size="small"
                placeholder="DD/MM/YYYY"
                fullWidth
                disabled={watch("isRoundTrip") === false}
                value={
                  field.value ? dayjs(field.value).format("DD/MM/YYYY") : ""
                }
                onClick={(e) => setAnchorElReturn(e.currentTarget)}
                error={!!errors.returnDate}
                helperText={errors.returnDate?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    paddingLeft: "6px",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
              <TwoMonthsPicker
                open={Boolean(anchorElReturn)}
                anchorEl={anchorElReturn}
                onClose={() => setAnchorElReturn(null)}
                currentMonth={currentMonth}
                minDate={
                  watch("departureDate")
                    ? dayjs(watch("departureDate"))
                    : dayjs()
                }
                onChange={(newDate) => {
                  field.onChange(newDate?.toISOString() || "");
                }}
                onMonthChange={onMonthChange}
              />
            </>
          )}
        />
      </div>
    </>
  );
}
