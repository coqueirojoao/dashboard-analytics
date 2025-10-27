import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import { Analytics } from "@/lib/db/models";

export async function GET() {
  try {
    await connectDB();

    // Get the most recent analytics data
    const analytics = await Analytics.findOne().sort({ date: -1 });

    if (!analytics) {
      // Return mock data if no data exists
      return NextResponse.json({
        totalUsers: 24567,
        totalRevenue: 145230,
        conversionRate: 3.24,
        averageOrderValue: 89.5,
        growth: {
          users: 12.5,
          revenue: 8.3,
          conversion: -2.1,
        },
      });
    }

    return NextResponse.json({
      totalUsers: analytics.metrics.totalUsers,
      totalRevenue: analytics.metrics.totalRevenue,
      conversionRate: analytics.metrics.conversionRate,
      averageOrderValue: analytics.metrics.averageOrderValue,
      growth: analytics.growth,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { date, metrics, growth } = body;

    // Create or update analytics data
    const analytics = await Analytics.findOneAndUpdate(
      { date: new Date(date) },
      { metrics, growth },
      { upsert: true, new: true }
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error saving analytics:", error);
    return NextResponse.json({ error: "Failed to save analytics data" }, { status: 500 });
  }
}
