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
  CartesianGrid,
} from "recharts";

interface SipBusinessData {
  month: string;
  bar1: number;
  lineValue: number;
}

export default function SipBusinessChart() {
  const [data, setData] = useState<SipBusinessData[]>([]);

  useEffect(() => {
    fetchData<{ sipBusiness: SipBusinessData[] }>("/api/charts").then((res) => {
      if (res) setData(res.sipBusiness);
    });
  }, []);

  const RoundedBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const radius = 6;
    return (
      <svg x={x} y={y} width={width} height={height} fill="none">
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
      </svg>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-5 shadow-sm">
      {/* Title + View Report */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200">
          SIP BUSINESS CHART
        </h2>
        <button className="text-xs text-red-600 dark:text-red-400 border border-red-500 dark:border-red-400 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900">
          View Report
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          barCategoryGap="20%"
          barGap={0}
        >
          {/* Drop Shadow Filter */}
          <defs>
            <filter id="lineShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#dc2626"
                floodOpacity="0.4"
              />
            </filter>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#374151", fontSize: 12 }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
            padding={{ left: 0, right: 0 }}
            interval={0}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fill: "#374151", fontSize: 12 }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              color: "#111827",
            }}
            wrapperStyle={{
              backgroundColor: "var(--tw-bg-white)",
              color: "var(--tw-text-gray-900)",
            }}
            labelStyle={{ color: "#4b5563" }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#374151" }}
            formatter={(value: string) => (
              <span className="text-gray-700 dark:text-gray-200">{value}</span>
            )}
          />

          {/* Bars & Lines */}
          <Bar
            dataKey="bar1"
            barSize={20}
            fill="#2563eb"
            name="SIP Bar"
            shape={<RoundedBar />}
          />
          <Line
            type="monotone"
            dataKey="lineValue"
            stroke="#dc2626"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="SIP Line"
            filter="url(#lineShadow)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
