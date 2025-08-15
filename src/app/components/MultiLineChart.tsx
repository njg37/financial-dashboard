"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LinearGradient,
  defs,
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
    <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">Monthly MIS</h2>
        <button className="text-sm text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded">
          View Report
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
            domain={["dataMin - 0.1", "dataMax + 0.1"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            cursor={{ stroke: "#9ca3af", strokeWidth: 1 }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", fontWeight: 600 }}
            iconSize={14}
            verticalAlign="top"
            height={36}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#dc2626"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorExpenses)"
            name="Expenses"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#16a34a"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorProfit)"
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
