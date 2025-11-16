"use client";
import { ILocation } from "../types";
import { ReactNode } from "react";

export const renderLocationOption = (option: ILocation): ReactNode => (
  <div>
    <div
      style={{
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "var(--font-nunito-sans), sans-serif !important",
      }}
    >
      {option.short_code} - {option.english_name}
    </div>
    <div
      style={{
        fontSize: 12,
        color: "#999",
        fontFamily: "var(--font-nunito-sans), sans-serif !important",
      }}
    >
      {option.code_state}
    </div>
  </div>
);
