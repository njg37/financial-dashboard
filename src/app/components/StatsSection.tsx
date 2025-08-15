"use client";
import StatCard from "./StatCard";
import { ShoppingCart, Package, XCircle, HandCoins, LineChart } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 px-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-2">
        {/* Time Filters */}
        <div className="flex gap-2 flex-wrap">
          {["3 Days", "7 Days", "10 Days", "30 Days"].map((day, i) => (
            <button
              key={i}
              className={`px-3 py-1 text-sm font-medium rounded border transition-colors
                ${
                  day === "3 Days"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {day}
            </button>
          ))}
        </div>

        {/* View Reports */}
        <div className="flex gap-2 flex-wrap">
          <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            View Report
          </button>
          <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            View Report
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="overflow-x-auto">
        <div className="flex w-full min-w-[600px] divide-x divide-gray-200 dark:divide-gray-700">
          <div className="flex-1">
            <StatCard icon={<ShoppingCart size={20} />} label="Purchases" value={0} amount="0.00 INR" />
          </div>
          <div className="flex-1">
            <StatCard icon={<Package size={20} />} label="Redemptions" value={0} amount="0.00 INR" />
          </div>
          <div className="flex-1">
            <StatCard icon={<XCircle size={20} />} label="Rej. Transactions" value={0} amount="0.00 INR" />
          </div>
          <div className="flex-1">
            <StatCard icon={<HandCoins size={20} />} label="SIP Rejections" value={0} amount="0.00 INR" />
          </div>
          <div className="flex-1">
            <StatCard icon={<LineChart size={20} />} label="New SIP" value={0} amount="0.00 INR" />
          </div>
        </div>
      </div>
    </div>
  );
}
