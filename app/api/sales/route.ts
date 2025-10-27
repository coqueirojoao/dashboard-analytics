import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import { Sales } from "@/lib/db/models";

const mockData = [
  { category: "Electronics", amount: 45000, percentage: 35 },
  { category: "Clothing", amount: 32000, percentage: 25 },
  { category: "Books", amount: 19200, percentage: 15 },
  { category: "Home & Garden", amount: 12800, percentage: 10 },
  { category: "Sports", amount: 10240, percentage: 8 },
  { category: "Toys", amount: 6400, percentage: 5 },
  { category: "Other", amount: 2560, percentage: 2 },
];

export async function GET() {
  try {
    await connectDB();

    const sales = await Sales.find().sort({ percentage: -1 });

    if (sales.length === 0) {
      // Return mock data if no data exists
      return NextResponse.json(mockData);
    }

    return NextResponse.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const salesData = Array.isArray(body) ? body : [body];

    // Bulk upsert sales data
    const operations = salesData.map((sale) => ({
      updateOne: {
        filter: { category: sale.category },
        update: { $set: sale },
        upsert: true,
      },
    }));

    await Sales.bulkWrite(operations);

    return NextResponse.json({ success: true, count: salesData.length });
  } catch (error) {
    console.error("Error saving sales:", error);
    return NextResponse.json({ error: "Failed to save sales data" }, { status: 500 });
  }
}
