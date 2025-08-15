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
    fetch(`/api/stats?days=${selectedRange}`)
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
      {/* Top Bar */}
      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 flex-wrap gap-2">
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

      {/* Stats Cards Row */}
      <div className="overflow-x-auto">
        <div className="flex w-full min-w-[600px] divide-x divide-gray-200 dark:divide-gray-700">
          {loading && !stats ? (
            <div className="p-4">Loading stats...</div>
          ) : stats ? (
            <>
              <div className="flex-1">
                <StatCard
                  icon={<ShoppingCart size={20} />}
                  label="Purchases"
                  value={stats.purchases}
                  amount={stats.purchasesAmount}
                />
              </div>
              <div className="flex-1">
                <StatCard
                  icon={<Package size={20} />}
                  label="Redemptions"
                  value={stats.redemptions}
                  amount={stats.redemptionsAmount}
                />
              </div>
              <div className="flex-1">
                <StatCard
                  icon={<XCircle size={20} />}
                  label="Rej. Transactions"
                  value={stats.rejTransactions}
                  amount={stats.rejTransactionsAmount}
                />
              </div>
              <div className="flex-1">
                <StatCard
                  icon={<HandCoins size={20} />}
                  label="SIP Rejections"
                  value={stats.sipRejections}
                  amount={stats.sipRejectionsAmount}
                />
              </div>
              <div className="flex-1">
                <StatCard
                  icon={<LineChart size={20} />}
                  label="New SIP"
                  value={stats.newSip}
                  amount={stats.newSipAmount}
                />
              </div>
            </>
          ) : (
            <div className="p-4">No stats data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
