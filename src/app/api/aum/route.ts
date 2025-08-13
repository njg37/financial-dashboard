import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 12500000, // in currency
    momChange: 4.5, // % change
  };
  return NextResponse.json(data);
}
