import Navbar from "./components/Navbar";
import AumCard from "./components/AumCard";
import SipCard from "./components/SipCard";
import StatsSection from "./components/StatsSection";
import BubbleChart from "./components/BubbleChart";
import BarLineChart from "./components/BarLineChart";
import MultiLineChart from "./components/MultiLineChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* AUM & SIP Cards */}
      <section className="py-4 px-2 sm:px-4 bg-gray-100 dark:bg-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AumCard />
          <SipCard />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 px-2 sm:px-4 bg-gray-100 dark:bg-gray-800">
        <StatsSection />
      </section>

      {/* Charts Section */}
      <section className="py-4 px-2 sm:px-4 bg-gray-100 dark:bg-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <BubbleChart />
          <BarLineChart />
          <MultiLineChart />
        </div>
      </section>
    </main>
  );
}
