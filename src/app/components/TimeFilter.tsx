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
    <div className="flex gap-2 p-4 bg-gray-100 border-b border-gray-200">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleClick(range.value)}
          className={`px-4 py-1.5 rounded text-sm font-medium border transition-colors
            ${
              active === range.value
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
