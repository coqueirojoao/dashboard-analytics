import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import { Revenue } from "@/lib/db/models";

const mockData = [
  { month: "2024-01", monthName: "Jan", year: 2024, revenue: 12000 },
  { month: "2024-02", monthName: "Feb", year: 2024, revenue: 19000 },
  { month: "2024-03", monthName: "Mar", year: 2024, revenue: 15000 },
  { month: "2024-04", monthName: "Apr", year: 2024, revenue: 25000 },
  { month: "2024-05", monthName: "May", year: 2024, revenue: 22000 },
  { month: "2024-06", monthName: "Jun", year: 2024, revenue: 30000 },
  { month: "2024-07", monthName: "Jul", year: 2024, revenue: 28000 },
  { month: "2024-08", monthName: "Aug", year: 2024, revenue: 32000 },
  { month: "2024-09", monthName: "Sep", year: 2024, revenue: 35000 },
  { month: "2024-10", monthName: "Oct", year: 2024, revenue: 38000 },
  { month: "2024-11", monthName: "Nov", year: 2024, revenue: 42000 },
  { month: "2024-12", monthName: "Dec", year: 2024, revenue: 45000 },
  { month: "2023-01", monthName: "Jan", year: 2023, revenue: 10000 },
  { month: "2023-02", monthName: "Feb", year: 2023, revenue: 15000 },
  { month: "2023-03", monthName: "Mar", year: 2023, revenue: 12000 },
  { month: "2023-04", monthName: "Apr", year: 2023, revenue: 20000 },
  { month: "2023-05", monthName: "May", year: 2023, revenue: 18000 },
  { month: "2023-06", monthName: "Jun", year: 2023, revenue: 25000 },
  { month: "2023-07", monthName: "Jul", year: 2023, revenue: 23000 },
  { month: "2023-08", monthName: "Aug", year: 2023, revenue: 27000 },
  { month: "2023-09", monthName: "Sep", year: 2023, revenue: 30000 },
  { month: "2023-10", monthName: "Oct", year: 2023, revenue: 32000 },
  { month: "2023-11", monthName: "Nov", year: 2023, revenue: 35000 },
  { month: "2023-12", monthName: "Dec", year: 2023, revenue: 38000 },
];

export async function GET() {
  try {
    await connectDB();

    const revenues = await Revenue.find().sort({ month: 1 });

    if (revenues.length === 0) {
      // Return mock data if no data exists
      return NextResponse.json(mockData);
    }

    return NextResponse.json(revenues);
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const revenues = Array.isArray(body) ? body : [body];

    // Bulk upsert revenue data
    const operations = revenues.map((rev) => ({
      updateOne: {
        filter: { month: rev.month },
        update: { $set: rev },
        upsert: true,
      },
    }));

    await Revenue.bulkWrite(operations);

    return NextResponse.json({ success: true, count: revenues.length });
  } catch (error) {
    console.error("Error saving revenue:", error);
    return NextResponse.json({ error: "Failed to save revenue data" }, { status: 500 });
  }
}
