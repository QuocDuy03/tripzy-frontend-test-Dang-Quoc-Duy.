import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton, Typography, Stack, Popover } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface TwoMonthsPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  currentMonth: Dayjs;
  minDate: Dayjs;
  onChange: (newDate: Dayjs | null) => void;
  onMonthChange: (direction: "prev" | "next") => void;
}

function DayComponent(props: any) {
  const { day, outsideCurrentMonth, ...other } = props;

  const isWeekend =
    dayjs(day).day() === 0 || // Chủ nhật
    dayjs(day).day() === 6; // Thứ 7

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        ...(isWeekend && {
          borderRadius: "50%",
          color: "#D32F2F",
          fontWeight: "bold",
        }),
        "&:hover": isWeekend
          ? {
              backgroundColor: "#FFCCCC",
            }
          : {},
      }}
    />
  );
}

export function TwoMonthsPicker({
  open,
  anchorEl,
  onClose,
  currentMonth,
  minDate,
  onChange,
  onMonthChange,
}: TwoMonthsPickerProps) {
  const referenceDateLeft = currentMonth;
  const referenceDateRight = currentMonth.add(1, "month");

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onMonthChange("prev")}
            sx={{
              ":hover": {
                backgroundColor: "#f7f8f8",
              },
            }}
          >
            <NavigateBefore />
          </IconButton>
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
            {referenceDateLeft.format("MMMM YYYY")} -
            {referenceDateRight.format("MMMM YYYY")}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onMonthChange("next")}
            sx={{
              ":hover": {
                backgroundColor: "#f7f8f8",
              },
            }}
          >
            <NavigateNext />
          </IconButton>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" sx={{ position: "relative" }}>
            <DateCalendar
              minDate={minDate}
              views={["day"]}
              referenceDate={referenceDateLeft}
              key={referenceDateLeft.toString()}
              onChange={(newDate) => {
                onChange(newDate);
                onClose();
              }}
              slots={{
                nextIconButton: () => <></>,
                previousIconButton: () => <></>,
                day: (props) => <DayComponent {...props} />,
              }}
            />
            <DateCalendar
              minDate={minDate}
              views={["day"]}
              key={referenceDateRight.toString()}
              referenceDate={referenceDateRight}
              onChange={(newDate) => {
                onChange(newDate);
                onClose();
              }}
              slots={{
                nextIconButton: () => <></>,
                previousIconButton: () => <></>,
                day: (props) => <DayComponent {...props} />,
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
    </Popover>
  );
}
