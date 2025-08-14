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
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">AUM</h2>
      {aum ? (
        <>
          <p className="text-2xl font-bold">₹{aum.value.toLocaleString()}</p>
          <p className={aum.momChange >= 0 ? "text-green-600" : "text-red-600"}>
            {aum.momChange}% MoM
          </p>
          <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            View Report
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
