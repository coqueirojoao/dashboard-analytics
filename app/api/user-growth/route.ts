import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import { UserGrowth } from "@/lib/db/models";

const mockData = [
  { month: "2024-01", monthName: "Jan", year: 2024, newUsers: 1200 },
  { month: "2024-02", monthName: "Feb", year: 2024, newUsers: 1900 },
  { month: "2024-03", monthName: "Mar", year: 2024, newUsers: 1500 },
  { month: "2024-04", monthName: "Apr", year: 2024, newUsers: 2500 },
  { month: "2024-05", monthName: "May", year: 2024, newUsers: 2200 },
  { month: "2024-06", monthName: "Jun", year: 2024, newUsers: 3000 },
  { month: "2024-07", monthName: "Jul", year: 2024, newUsers: 2800 },
  { month: "2024-08", monthName: "Aug", year: 2024, newUsers: 3200 },
  { month: "2024-09", monthName: "Sep", year: 2024, newUsers: 3500 },
  { month: "2024-10", monthName: "Oct", year: 2024, newUsers: 3800 },
  { month: "2024-11", monthName: "Nov", year: 2024, newUsers: 4200 },
  { month: "2024-12", monthName: "Dec", year: 2024, newUsers: 4500 },
];

export async function GET() {
  try {
    await connectDB();

    const userGrowth = await UserGrowth.find().sort({ month: 1 });

    if (userGrowth.length === 0) {
      // Return mock data if no data exists
      return NextResponse.json(mockData);
    }

    return NextResponse.json(userGrowth);
  } catch (error) {
    console.error("Error fetching user growth:", error);
    return NextResponse.json({ error: "Failed to fetch user growth data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const userGrowthData = Array.isArray(body) ? body : [body];

    // Bulk upsert user growth data
    const operations = userGrowthData.map((growth) => ({
      updateOne: {
        filter: { month: growth.month },
        update: { $set: growth },
        upsert: true,
      },
    }));

    await UserGrowth.bulkWrite(operations);

    return NextResponse.json({ success: true, count: userGrowthData.length });
  } catch (error) {
    console.error("Error saving user growth:", error);
    return NextResponse.json({ error: "Failed to save user growth data" }, { status: 500 });
  }
}
