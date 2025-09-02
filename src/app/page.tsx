"use client";

import { useCallback } from "react";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AumCard from "./components/AumCard";
import SipCard from "./components/SipCard";
import StatsSection from "./components/StatsSection";
import BubbleChart from "./components/BubbleChart";
import BarLineChart from "./components/BarLineChart";
import MultiLineChart from "./components/MultiLineChart";

// Extend jsPDF type for lastAutoTable
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}

export default function Home() {
  const handleDownloadPDF = useCallback(async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // ---------- Title ----------
    pdf.setFontSize(18);
    pdf.text("Financial Dashboard Report", pageWidth / 2, 15, {
      align: "center",
    });

    const sanitize = (val: string): string => val.replace(/[^\d₹,]/g, "");

    // ---------- AUM & SIP Table ----------
    autoTable(pdf, {
      startY: 25,
      head: [["Metric", "Value"]],
      body: [
        ["AUM", sanitize("12,50,000")],
        ["SIP", sanitize("45,000")],
      ] as RowInput[],
      styles: { halign: "center" },
      headStyles: { fillColor: [75, 123, 236] },
    });

    const lastY: number = pdf.lastAutoTable?.finalY ?? 40;

    // ---------- Transaction Overview ----------
    pdf.setFontSize(14);
    pdf.text("Transaction Overview", 20, lastY + 15);

    autoTable(pdf, {
      startY: lastY + 20,
      head: [["Type", "Amount"]],
      body: [
        ["Purchases", sanitize("1,20,000")],
        ["Redemptions", sanitize("80,000")],
        ["Rejected Txns", sanitize("5,000")],
        ["SIP Rejections", sanitize("3,000")],
        ["New SIP", sanitize("20,000")],
      ] as RowInput[],
    });

    // ---------- Page 2: Clients Chart ----------
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text("Clients Chart", 20, 20);

    const chartX = 40;
    const chartY = 140;

    pdf.line(chartX, 40, chartX, chartY); // y-axis
    pdf.line(chartX, chartY, chartX + 120, chartY); // x-axis

    for (let i = 0; i <= 250; i += 50) {
      const y = chartY - i * 0.4;
      pdf.text(`${i}`, chartX - 10, y + 3);
      pdf.line(chartX - 3, y, chartX, y);
    }

    const quarters: string[] = ["Online", "New", "Active", "InActive"];
    quarters.forEach((q, i) => {
      const x = chartX + (i + 1) * 25;
      pdf.text(q, x, chartY + 10);
    });

    const bubbles: { x: number; y: number; r: number; value: number }[] = [
      { x: 60, y: 100, r: 10, value: 120 },
      { x: 90, y: 80, r: 15, value: 200 },
      { x: 130, y: 70, r: 20, value: 250 },
      { x: 160, y: 110, r: 12, value: 150 },
    ];

    bubbles.forEach((b) => {
      pdf.setFillColor(75, 123, 236);
      pdf.circle(b.x, b.y, b.r, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.text(`${b.value}`, b.x, b.y + 2, { align: "center" });
      pdf.setTextColor(0, 0, 0);
    });

    // ---------- Page 3: SIP Business ----------
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text("SIP Business (Bars + Line)", 20, 20);

    const sipX = 40;
    const sipY = 140;
    const sipValues: number[] = [20, 40, 60, 30, 80, 50];
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    pdf.line(sipX, 40, sipX, sipY);
    pdf.line(sipX, sipY, sipX + 120, sipY);

    for (let i = 0; i <= 100; i += 20) {
      const y = sipY - i;
      pdf.text(`${i}k`, sipX - 15, y + 3);
      pdf.line(sipX - 3, y, sipX, y);
    }

    let prevX = 0;
    let prevY = 0;
    sipValues.forEach((val, i) => {
      const x = sipX + (i + 1) * 18;
      const y = sipY - val;

      pdf.setFillColor(54, 162, 235);
      pdf.rect(x - 5, y, 10, val, "F");

      if (i > 0) {
        pdf.setDrawColor(255, 99, 132);
        pdf.line(prevX, prevY, x, y);
      }
      pdf.circle(x, y, 2, "F");

      pdf.setFontSize(10);
      pdf.text(months[i], x - 5, sipY + 10);

      prevX = x;
      prevY = y;
    });

    // ---------- Page 4: Monthly MIS ----------
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text("Monthly MIS", 20, 20);

    const misX = 40;
    const misY = 140;
    const misMonths: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const revenue: number[] = [60, 70, 65, 80, 75, 90];
    const profit: number[] = [30, 40, 35, 50, 45, 60];
    const expenses: number[] = [20, 25, 30, 28, 35, 40];

    pdf.line(misX, 40, misX, misY);
    pdf.line(misX, misY, misX + 120, misY);

    for (let i = 0; i <= 100; i += 20) {
      const y = misY - i;
      pdf.text(`${i}k`, misX - 15, y + 3);
      pdf.line(misX - 3, y, misX, y);
    }

    misMonths.forEach((m, i) => {
      const x = misX + (i + 1) * 18;
      pdf.text(m, x - 5, misY + 10);
    });

    const plotLine = (data: number[], color: [number, number, number]) => {
      let prevX = 0;
      let prevY = 0;
      data.forEach((val, i) => {
        const x = misX + (i + 1) * 18;
        const y = misY - val;
        if (i > 0) {
          pdf.setDrawColor(...color);
          pdf.line(prevX, prevY, x, y);
        }
        pdf.circle(x, y, 2, "F");
        prevX = x;
        prevY = y;
      });
    };

    plotLine(revenue, [54, 162, 235]);
    plotLine(profit, [255, 99, 132]);
    plotLine(expenses, [255, 206, 86]);

    pdf.setFontSize(10);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, pdf.internal.pageSize.getHeight() - 10);

    // ---------- Platform-specific save ----------
    if (Capacitor.isNativePlatform()) {
      const pdfBlob = pdf.output("blob");

      const blobToBase64 = (blob: Blob): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

      const base64Data = await blobToBase64(pdfBlob);

      await Filesystem.writeFile({
        path: "financial-dashboard.pdf",
        data: base64Data,
        directory: Directory.Documents,
      });

      alert("PDF saved to your device!");
    } else {
      pdf.save("financial-dashboard.pdf");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header onDownloadPDF={handleDownloadPDF} />
      <Navbar />

      <div id="dashboard-content">
        <section className="py-4 px-2 sm:px-4 bg-gray-100 dark:bg-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AumCard />
            <SipCard />
          </div>
        </section>

        <section className="py-4 px-2 sm:px-4 bg-gray-100 dark:bg-gray-800">
          <StatsSection />
        </section>

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
