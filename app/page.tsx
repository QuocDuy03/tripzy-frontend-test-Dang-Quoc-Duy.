"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Emergency } from "@mui/icons-material";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import data from "@/app/data/data.json";
import { validationSchema } from "@/app/schemas/validationSchema";
import { ILocation, IFormInputs } from "./types";
import { TabSection, TabLabels } from "./components/TabSection";
import { SearchForm } from "./components/SearchForm";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMonthLeft, setCurrentMonth] = useState(dayjs());
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      from: null,
      to: null,
      departureDate: "",
      returnDate: null,
      isRoundTrip: false,
      passengers: 1,
    },
  });

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
      reset({
        from: null,
        to: null,
        departureDate: "",
        returnDate: null,
        isRoundTrip: false,
        passengers: 1,
      });
    },
    [reset]
  );

  const handleMonthChange = useCallback((direction: "prev" | "next") => {
    setCurrentMonth((d) =>
      direction === "prev" ? d.subtract(1, "month") : d.add(1, "month")
    );
  }, []);

  useEffect(() => {
    const loadLocations = () => {
      setLoading(true);
      const locationsData = data.data as ILocation[];
      setLocations(locationsData);
      setLoading(false);
    };
    loadLocations();
  }, []);

  const onSubmit = useCallback(
    (formData: IFormInputs) => {
      const params = new URLSearchParams();
      params.append("mode", "bus");
      params.append("from", formData.from?.english_name || "");
      params.append("to", formData.to?.english_name || "");
      params.append("dep", dayjs(formData.departureDate).format("YYYY-MM-DD"));
      if (formData.isRoundTrip && formData.returnDate) {
        params.append("ret", dayjs(formData.returnDate).format("YYYY-MM-DD"));
      }
      params.append("pax", formData.passengers.toString());

      router.push(`/search?${params.toString()}`);
    },
    [router]
  );

  return (
    <main className="w-7xl mx-auto flex flex-col justify-center h-full">
      <header className="py-5 flex text-3xl font-bold gap-2 items-center">
        <Emergency
          className="text-[#19C0FF] h-[30px]! w-[30px]!"
        />
        <span className="text-[#19C0FF]">Tripzy</span>
      </header>
      <div className="pt-32 pb-5 text-center">
        <Typography
          variant="h3"
          fontFamily="inherit"
          className="font-semibold!"
        >
          Travel Smarter, Not Harder
        </Typography>
        <p className="text-[#767689]">
          Make every trip effortless. Tripzy lets you book rides and plan
          journeys with ease
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl bg-white rounded-2xl shadow-2xl z-10">
        <TabSection
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          tabs={TabLabels}
        />
        {selectedTab === 0 &&
          (loading ? (
            <CircularProgress />
          ) : (
            <Box p={3}>
              <SearchForm
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
                locations={locations}
                currentMonth={currentMonthLeft}
                onMonthChange={handleMonthChange}
                onSubmit={handleSubmit(onSubmit)}
              />
            </Box>
          ))}
        {selectedTab === 1 && (
          <Box p={10}>
            <Typography className="text-center text-[#767689]">
              No data
            </Typography>
          </Box>
        )}
        {selectedTab === 2 && (
          <Box p={10}>
            <Typography className="text-center text-[#767689]">
              No data
            </Typography>
          </Box>
        )}
      </div>
    </main>
  );
}
