"use client";
import { useState, useEffect } from "react";
import TimeFilter from "./TimeFilter";
import StatCard from "./StatCard";
import { ShoppingCart, Package, XCircle, HandCoins, LineChart } from "lucide-react";

interface StatsData {
  purchases: number;
  redemptions: number;
  rejTransactions: number;
  sipRejections: number;
  newSip: number;
  purchasesAmount: string;
  redemptionsAmount: string;
  rejTransactionsAmount: string;
  sipRejectionsAmount: string;
  newSipAmount: string;
}

export default function StatsSection() {
  const [selectedRange, setSelectedRange] = useState(7);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  let isMounted = true;
  setLoading(true);

  // If you keep a dummy JSON file in /public/data/stats.json
  fetch(`/data/stats.json`)
    .then((res) => res.json())
    .then((data) => {
      if (isMounted) {
        setStats(data);
        setLoading(false);
      }
    })
    .catch(() => {
      if (isMounted) {
        setStats(null);
        setLoading(false);
      }
    });

  return () => {
    isMounted = false;
  };
}, [selectedRange]);


  return (
    <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 px-4">
      {/* --- Top Bar --- */}

      {/* ✅ Mobile layout */}
      <div className="flex flex-col gap-2 py-2 border-b border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex justify-between items-start">
          <div></div>
          <div className="flex gap-2">
            <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
              View Report
            </button>
            <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
              View Report
            </button>
          </div>
        </div>
        <div className="pl-0">
          <TimeFilter onChange={(value) => setSelectedRange(value)} />
        </div>
      </div>

      {/* ✅ Tablet/Desktop layout */}
      <div className="hidden md:flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-2">
        <TimeFilter onChange={(value) => setSelectedRange(value)} />
        <div className="flex gap-2 flex-wrap">
          <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            View Report
          </button>
          <button className="text-xs text-red-500 dark:text-red-400 border border-red-400 dark:border-red-600 rounded px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            View Report
          </button>
        </div>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div className="py-4">
        {loading && !stats ? (
          <div className="p-4">Loading stats...</div>
        ) : stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<ShoppingCart size={20} />}
              label="Purchases"
              value={stats.purchases}
              amount={stats.purchasesAmount}
            />
            <StatCard
              icon={<Package size={20} />}
              label="Redemptions"
              value={stats.redemptions}
              amount={stats.redemptionsAmount}
            />
            <StatCard
              icon={<XCircle size={20} />}
              label="Rej. Transactions"
              value={stats.rejTransactions}
              amount={stats.rejTransactionsAmount}
            />
            <StatCard
              icon={<HandCoins size={20} />}
              label="SIP Rejections"
              value={stats.sipRejections}
              amount={stats.sipRejectionsAmount}
            />
            <StatCard
              icon={<LineChart size={20} />}
              label="New SIP"
              value={stats.newSip}
              amount={stats.newSipAmount}
            />
          </div>
        ) : (
          <div className="p-4">No stats data available.</div>
        )}
      </div>
    </div>
  );
}
