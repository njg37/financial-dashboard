import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 1.39,
    momChange: -2.3,
  };

  return NextResponse.json(data);
}
