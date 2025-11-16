import { DirectionsBus, Apartment, FlightTakeoff } from "@mui/icons-material";
import { Tabs, Tab } from "@mui/material";
import { ITab } from "../types";

interface TabSectionProps {
  selectedTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: ITab[];
}

export const TabLabels: ITab[] = [
  {
    id: 0,
    label: "Bus & Shuttle",
    icon: (
      <DirectionsBus className="text-[#19C0FF] bg-[#D3F3FF] rounded-full h-10! w-10! p-2!" />
    ),
    style: { backgroundColor: "#EBF9FF", color: "#19C0FF" },
  },
  {
    id: 1,
    label: "Hotel & Accommodation",
    icon: (
      <Apartment className="text-[##447A11] bg-[#E8FBCC] rounded-full h-10! w-10! p-2!" />
    ),
    style: { backgroundColor: "#F4FFEB", color: "#447A11" },
  },
  {
    id: 2,
    label: "Flight",
    icon: (
      <FlightTakeoff className="text-[#5664E1] bg-[#E1EDFE] rounded-full h-10! w-10! p-2!" />
    ),
    style: { backgroundColor: "#EBF4FF", color: "#5664E1" },
  },
];

export function TabSection({
  selectedTab,
  onTabChange,
  tabs,
}: TabSectionProps) {
  return (
    <Tabs
      value={selectedTab}
      onChange={onTabChange}
      sx={{
        "& .MuiTabs-indicator": {
          display: "none",
        },
      }}
      className="rounded-2xl shadow-xl bg-white p-2"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
          style={{
            backgroundColor:
              tab.id === selectedTab ? tab.style.backgroundColor : "",
            borderRight:
              tab.id !== tabs.length - 1 ? "1px solid #CFCFCF" : "none",
            fontWeight: 500,
          }}
          className="w-1/3! max-w-1/3! rounded-2xl! flex! justify-start!"
        />
      ))}
    </Tabs>
  );
}
