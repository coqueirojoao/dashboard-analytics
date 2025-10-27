import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import { Traffic } from "@/lib/db/models";

const mockData = [
  { date: "2024-01-15", dayOfWeek: "Mon", organic: 3200, direct: 2100, referral: 1500 },
  { date: "2024-01-16", dayOfWeek: "Tue", organic: 4100, direct: 2800, referral: 1900 },
  { date: "2024-01-17", dayOfWeek: "Wed", organic: 3800, direct: 2500, referral: 1700 },
  { date: "2024-01-18", dayOfWeek: "Thu", organic: 5100, direct: 3400, referral: 2300 },
  { date: "2024-01-19", dayOfWeek: "Fri", organic: 4900, direct: 3200, referral: 2100 },
  { date: "2024-01-20", dayOfWeek: "Sat", organic: 3700, direct: 2400, referral: 1600 },
  { date: "2024-01-21", dayOfWeek: "Sun", organic: 2800, direct: 1900, referral: 1200 },
];

export async function GET() {
  try {
    await connectDB();

    // Get last 7 days of traffic data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const traffic = await Traffic.find({
      date: { $gte: sevenDaysAgo },
    }).sort({ date: 1 });

    if (traffic.length === 0) {
      // Return mock data if no data exists
      return NextResponse.json(mockData);
    }

    return NextResponse.json(traffic);
  } catch (error) {
    console.error("Error fetching traffic:", error);
    return NextResponse.json({ error: "Failed to fetch traffic data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const trafficData = Array.isArray(body) ? body : [body];

    // Bulk upsert traffic data
    const operations = trafficData.map((traffic) => ({
      updateOne: {
        filter: { date: new Date(traffic.date) },
        update: { $set: traffic },
        upsert: true,
      },
    }));

    await Traffic.bulkWrite(operations);

    return NextResponse.json({ success: true, count: trafficData.length });
  } catch (error) {
    console.error("Error saving traffic:", error);
    return NextResponse.json({ error: "Failed to save traffic data" }, { status: 500 });
  }
}
