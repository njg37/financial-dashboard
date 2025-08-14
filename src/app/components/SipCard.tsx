"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

interface SIPData {
  value: number;
  momChange: number;
}

export default function SipCard() {
  const [sip, setSip] = useState<SIPData | null>(null);

  useEffect(() => {
    fetchData<SIPData>("/api/sip").then((data) => {
      if (data) setSip(data);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">SIP</h2>
      {sip ? (
        <>
          <p className="text-2xl font-bold">₹{sip.value.toLocaleString()}</p>
          <p className={sip.momChange >= 0 ? "text-green-600" : "text-red-600"}>
            {sip.momChange}% MoM
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
