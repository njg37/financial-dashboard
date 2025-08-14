"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface MISData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export default function MultiLineChart() {
  const [data, setData] = useState<MISData[]>([]);

  useEffect(() => {
    fetchData<{ monthlyMIS: MISData[] }>("/api/charts").then((res) => {
      if (res) setData(res.monthlyMIS);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Monthly MIS</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" name="Revenue" />
          <Line type="monotone" dataKey="expenses" stroke="#dc2626" name="Expenses" />
          <Line type="monotone" dataKey="profit" stroke="#16a34a" name="Profit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
