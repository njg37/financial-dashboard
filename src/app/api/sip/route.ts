import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 350000, // in currency
    momChange: -2.3, // % change
  };
  return NextResponse.json(data);
}
