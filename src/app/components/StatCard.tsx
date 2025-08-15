"use client";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  amount: string;
  showReport?: boolean;
}

export default function StatCard({
  icon,
  label,
  value,
  amount,
  showReport,
}: StatCardProps) {
  return (
    <div className="w-full relative flex items-center px-4 py-4 h-[110px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
      {/* View Report at top right */}
      {showReport && (
        <button className="absolute top-2 right-3 text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
          View Report
        </button>
      )}

      {/* Icon */}
      <div className="flex-shrink-0 text-red-500 flex items-center justify-center w-10 h-10">
        {icon}
      </div>

      {/* Texts */}
      <div className="flex flex-col justify-center flex-1 pl-3">
        {/* Label */}
        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {label}
        </span>

        {/* Value */}
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {value}
        </span>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

        {/* Amount */}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {amount}
        </span>
      </div>
    </div>
  );
}
