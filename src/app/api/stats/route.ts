import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const days = Number(searchParams.get("days")) || 7;

  // Simple mock logic, you can replace with real data or more complex logic
  const baseValue = days * 10;

  const responseData = {
    purchases: baseValue,
    redemptions: baseValue - 5,
    rejTransactions: baseValue - 8,
    sipRejections: baseValue - 6,
    newSip: baseValue + 3,
    purchasesAmount: `${baseValue * 1000}.00 INR`,
    redemptionsAmount: `${(baseValue - 5) * 800}.00 INR`,
    rejTransactionsAmount: `${(baseValue - 8) * 500}.00 INR`,
    sipRejectionsAmount: `${(baseValue - 6) * 300}.00 INR`,
    newSipAmount: `${(baseValue + 3) * 700}.00 INR`,
  };

  return NextResponse.json(responseData);
}
