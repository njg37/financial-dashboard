"use client";

import { useCallback } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AumCard from "./components/AumCard";
import SipCard from "./components/SipCard";
import StatsSection from "./components/StatsSection";
import BubbleChart from "./components/BubbleChart";
import BarLineChart from "./components/BarLineChart";
import MultiLineChart from "./components/MultiLineChart";

export default function Home() {
  // PDF generation logic with html2canvas + jsPDF
  const handleDownloadPDF = useCallback(async () => {
    const element = document.getElementById("dashboard-content");
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    // Capture full scrollable area
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Footer
    pdf.setFontSize(10);
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      10,
      pdf.internal.pageSize.getHeight() - 10
    );

    pdf.save("financial-dashboard.pdf");
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header with Download PDF */}
      <Header onDownloadPDF={handleDownloadPDF} />

      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content Wrapper for PDF */}
      <div id="dashboard-content">
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
      </div>
    </main>
  );
}
