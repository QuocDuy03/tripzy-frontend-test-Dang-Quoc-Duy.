import { DirectionsBus, SwapHoriz } from "@mui/icons-material";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Controller, Control, FieldErrors, useWatch } from "react-hook-form";
import { ILocation, IFormInputs } from "@/app/types";
import { renderLocationOption } from "@/app/utils/renderLocationOption";

interface LocationSelectorProps {
  control: Control<IFormInputs>;
  locations: ILocation[];
  errors: FieldErrors<IFormInputs>;
  onSwap: () => void;
}

export function LocationSelector({
  control,
  locations,
  errors,
  onSwap,
}: LocationSelectorProps) {
  const from = useWatch({ control, name: "from" });
  const to = useWatch({ control, name: "to" });
  return (
    <>
      <div className="w-full">
        <label className="text-xs font-semibold text-gray-600 block mb-2 leading-4.5">
          FROM
        </label>
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              fullWidth
              size="small"
              options={locations}
              getOptionLabel={(option) => option?.english_name || ""}
              isOptionEqualToValue={(option, value) =>
                option?.short_code === value?.short_code
              }
              onChange={(event, value) => field.onChange(value)}
              getOptionDisabled={(option) =>
                option?.short_code === to?.short_code
              }
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.short_code}
                  style={{ padding: "8px 14.5px" }}
                >
                  {renderLocationOption(option)}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter city, terminal,..."
                  error={!!errors.from}
                  helperText={errors.from?.message}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <DirectionsBus />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        />
      </div>
      <div className={`${Object.keys(errors).length ? "my-auto" : "mt-auto"} `}>
        <IconButton
          className="rounded-full! bg-white! shadow-xl! h-10! w-10! p-2! border! border-gray-200!"
          onClick={onSwap}
        >
          <SwapHoriz className="text-[#19C0FF]" />
        </IconButton>
      </div>
      <div className="w-full">
        <label className="text-xs font-semibold text-gray-600 block mb-2 leading-4.5">
          TO
        </label>
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              fullWidth
              size="small"
              options={locations}
              getOptionLabel={(option) => option?.english_name || ""}
              isOptionEqualToValue={(option, value) =>
                option?.short_code === value?.short_code
              }
              onChange={(event, value) => field.onChange(value)}
              getOptionDisabled={(option) =>
                option?.short_code === from?.short_code
              }
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.short_code}
                  style={{ padding: "8px 14.5px" }}
                >
                  {renderLocationOption(option)}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter city, terminal,..."
                  error={!!errors.to}
                  helperText={errors.to?.message}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <DirectionsBus />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        />
      </div>
    </>
  );
}
