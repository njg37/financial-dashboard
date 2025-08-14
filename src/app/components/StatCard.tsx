"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

interface StatItem {
  title: string;
  value: number;
}

export default function StatCard() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    fetchData<StatItem[]>("/api/stats").then((data) => {
      if (data) setStats(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
      {stats.length > 0
        ? stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center justify-center gap-1"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))
        : <p className="col-span-full text-center">Loading...</p>}
    </div>
  );
}
