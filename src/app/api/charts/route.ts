import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    clientsBubble: [
      { name: "Client A", size: 400 },
      { name: "Client B", size: 300 },
      { name: "Client C", size: 200 },
    ],
    sipBusiness: [
      { month: "Jan", barValue: 300, lineValue: 250 },
      { month: "Feb", barValue: 400, lineValue: 350 },
    ],
    monthlyMIS: [
      { month: "Jan", revenue: 5000, expenses: 3000, profit: 2000 },
      { month: "Feb", revenue: 6000, expenses: 3500, profit: 2500 },
    ]
  };
  return NextResponse.json(data);
}
