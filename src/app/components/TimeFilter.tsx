"use client";
import { useState } from "react";

const ranges = [
  { label: "3 Days", value: 3 },
  { label: "7 Days", value: 7 },
  { label: "10 Days", value: 10 },
  { label: "30 Days", value: 30 },
];

export default function TimeFilter({ onChange }: { onChange?: (value: number) => void }) {
  const [active, setActive] = useState<number>(7);

  const handleClick = (value: number) => {
    setActive(value);
    if (onChange) onChange(value); // Trigger callback to refetch data
  };

  return (
    <div className="flex gap-3 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleClick(range.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${active === range.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
