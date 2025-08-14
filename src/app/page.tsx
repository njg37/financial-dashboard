import Navbar from "./components/Navbar";
import TimeFilter from "./components/TimeFilter";
import AumCard from "./components/AumCard";
import SipCard from "./components/SipCard";
import StatCard from "./components/StatCard";
import BubbleChart from "./components/BubbleChart";
import BarLineChart from "./components/BarLineChart";
import MultiLineChart from "./components/MultiLineChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Time Range Filter */}
      <TimeFilter />

      {/* Main Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <AumCard />
        <SipCard />
      </section>

      {/* Stats Section */}
      <StatCard />

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <BubbleChart />
        <BarLineChart />
      </section>

      {/* Full Width Chart */}
      <section className="p-4">
        <MultiLineChart />
      </section>
    </main>
  );
}
