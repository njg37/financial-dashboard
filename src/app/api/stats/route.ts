import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { title: "Purchases", value: 120 },
    { title: "Redemptions", value: 80 },
    { title: "Rejected Transactions", value: 5 },
    { title: "SIP Rejections", value: 3 },
    { title: "New SIP", value: 15 }
  ];
  return NextResponse.json(data);
}
