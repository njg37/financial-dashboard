"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

interface AUMData {
  value: number;
  momChange: number;
}

export default function AumCard() {
  const [aum, setAum] = useState<AUMData | null>(null);

  useEffect(() => {
    fetchData<AUMData>("/api/aum").then((data) => {
      if (data) setAum(data);
    });
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm min-h-[150px] flex flex-col justify-between">
      {/* View Report at top right only */}
      <div className="flex justify-end">
        <button className="border border-red-500 text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50 font-medium">
          View Report
        </button>
      </div>

      {aum ? (
        <>
          {/* "Current" label above the main value */}
          <p className="text-xs text-gray-500 text-center mt-1">Current</p>

          {/* AUM + number centered */}
          <div className="flex justify-center items-end gap-2 mt-1">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600">
              AUM
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {aum.value.toLocaleString()}
            </p>
            <span className="text-base sm:text-lg text-gray-500 font-medium">
              Cr
            </span>
          </div>

          {/* MoM centered */}
          <p
            className={`text-xs font-medium flex items-center justify-center gap-1 mt-1 ${
              aum.momChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {aum.momChange >= 0 ? "▲" : "▼"} {aum.momChange}% MoM
          </p>

          {/* View Trend bottom right */}
          <div className="flex justify-end mt-2">
            <a
              href="#"
              className="text-xs text-green-600 hover:underline flex items-center gap-1"
            >
              View Trend ▼
            </a>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm mt-4 text-center">Loading...</p>
      )}
    </div>
  );
}
