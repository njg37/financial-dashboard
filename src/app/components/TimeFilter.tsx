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
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleClick(range.value)}
          className={`px-3 py-1 text-sm font-medium rounded border transition-colors
            ${
              active === range.value
                ? "bg-red-500 text-white border-red-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
