import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    clientsBubble: [
      { name: "Client A", size: 420 },
      { name: "Client B", size: 360 },
      { name: "Client C", size: 280 },
      { name: "Client D", size: 240 },
    ],

    sipBusiness: [
      { month: "Jan", bar1: 100, lineValue: 250 },
      { month: "Feb", bar1: 130, lineValue: 180 },
      { month: "Mar", bar1: 125, lineValue: 170 },
      { month: "Apr", bar1: 140, lineValue: 190 },
    ],

    monthlyMIS: [
      { month: "Jan", revenue: -20000, expenses: 25000, profit: 10000 },
      { month: "Feb", revenue:  5000,  expenses: 23000, profit: 12000 },
      { month: "Mar", revenue: 20000,  expenses: 20000, profit: 18000 },
      { month: "Apr", revenue: 40000,  expenses: 17000, profit: 25000 },
      { month: "May", revenue: 35000,  expenses: 15000, profit: 20000 },
      { month: "Jun", revenue: 10000,  expenses: 14000, profit: 10000 },
    ],
  };

  return NextResponse.json(data);
}
