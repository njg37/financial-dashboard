import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 12.9, // in currency
    momChange: +0.77, // % change
  };
  return NextResponse.json(data);
}
