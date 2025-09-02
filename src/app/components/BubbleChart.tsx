"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../utils/fetchData";

// Interfaces
interface ClientData {
  name: string;
  size: number;
}

interface BubbleItem extends ClientData {
  x: number;
  y: number;
  px: number;
  color: string;
  opacity: number;
  z: number;
}

// Color palette
const COLORS = ["#f97316", "#16a34a", "#dc2626", "#b91c1c"];

export default function BubbleChart() {
  const [raw, setRaw] = useState<ClientData[]>([]);

  // Fetch data on mount
  useEffect(() => {
    fetchData<{ clientsBubble: ClientData[] }>("charts").then((d) => {
      if (!d) return;
      const base = d.clientsBubble.slice(0, 4);

      // Pad to ensure exactly 4 bubbles
      while (base.length < 4) {
        base.push({ name: `Client ${base.length + 1}`, size: 250 });
      }

      setRaw(base);
    });
  }, []);

  // Processed bubble chart data
  const bubbles = useMemo<BubbleItem[]>(() => {
    if (!raw.length) return [];

    const LAYOUT = [
      { x: 42, y: 52 },
      { x: 34, y: 58 },
      { x: 50, y: 66 },
      { x: 57, y: 47 },
    ];

    const sizes = raw.map((r) => r.size);
    const minV = Math.min(...sizes);
    const maxV = Math.max(...sizes);
    const scale = (v: number) => {
      const minPx = 60, maxPx = 150;
      if (minV === maxV) return (minPx + maxPx) / 2;
      return minPx + ((v - minV) * (maxPx - minPx)) / (maxV - minV);
    };

    const bubbleData = raw.map((r, i) => ({
      ...r,
      x: LAYOUT[i].x,
      y: LAYOUT[i].y,
      px: scale(r.size),
      color: COLORS[i],
      opacity: 1,
      z: 0,
    }));

    const sorted = [...bubbleData].sort((a, b) => b.px - a.px);
    sorted.forEach((b, i) => {
      b.z = i + 1;
      b.opacity = i === 0 ? 0.4 : 0.8;
    });

    return sorted;
  }, [raw]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm p-5 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase">
          Clients
        </h2>
        <button
          type="button"
          className="flex items-center space-x-1 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-500 rounded px-3 py-1 text-xs hover:bg-red-50 dark:hover:bg-red-900 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Report</span>
        </button>
      </div>

      {/* Bubble Chart */}
      <div className="relative w-full h-[300px]">
        {bubbles.map((b, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.px}px`,
              height: `${b.px}px`,
              background: b.color,
              opacity: b.opacity,
              zIndex: b.z,
              transform: "translate(-50%, -50%)",
              border: "2px solid #fff",
              position: "absolute",
              filter: "drop-shadow(0 0 6px rgba(0,0,0,0.1))",
            }}
            title={b.name}
          />
        ))}

        {/* Labels */}
        {bubbles.map((b, i) => (
          <div
            key={`label-${i}`}
            className="absolute flex items-center justify-center font-extrabold text-white pointer-events-none select-none"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.px}px`,
              height: `${b.px}px`,
              zIndex: 999,
              transform: "translate(-50%, -50%)",
              fontSize: "1.25rem",
              textShadow: "0 0 5px rgba(0,0,0,0.6)",
            }}
          >
            {Math.round(b.size)}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex space-x-6 mt-6 justify-center">
        <LegendItem color="#f97316" label="Online" />
        <LegendItem color="#16a34a" label="New" />
        <LegendItem color="#dc2626" label="Active" />
        <LegendItem color="#b91c1c" label="InActive" />
      </div>
    </div>
  );
}

// Reusable legend item
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <span
        className="inline-block rounded-full"
        style={{ backgroundColor: color, width: 16, height: 16 }}
      />
      <span>{label}</span>
    </div>
  );
}
