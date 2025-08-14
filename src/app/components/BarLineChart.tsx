"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

interface SipBusinessData {
  month: string;
  barValue: number;
  lineValue: number;
}

export default function BarLineChart() {
  const [data, setData] = useState<SipBusinessData[]>([]);

  useEffect(() => {
    fetchData<{ sipBusiness: SipBusinessData[] }>("/api/charts").then((res) => {
      if (res) setData(res.sipBusiness);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">SIP Business</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="barValue" barSize={30} fill="#2563eb" name="SIP Bar" />
          <Line type="monotone" dataKey="lineValue" stroke="#16a34a" name="SIP Line" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
