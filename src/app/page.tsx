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
      <Navbar />

      <section className="bg-gray-100 p-4 dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AumCard />
          <SipCard />
        </div>
      </section>

      <section className="bg-gray-100 p-4 dark:bg-gray-800">
        <StatsSection />
      </section>

      <section className="bg-gray-100 p-4 dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <BubbleChart />
          <BarLineChart />
          <MultiLineChart />
        </div>
      </section>
    </main>
  );
}
