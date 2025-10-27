import connectDB from "./mongodb";
import { Analytics, Revenue, Traffic, Sales, UserGrowth } from "./models";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Analytics.deleteMany({});
    await Revenue.deleteMany({});
    await Traffic.deleteMany({});
    await Sales.deleteMany({});
    await UserGrowth.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Seed Analytics
    await Analytics.create({
      date: new Date(),
      metrics: {
        totalUsers: 24567,
        totalRevenue: 145230,
        conversionRate: 3.24,
        averageOrderValue: 89.5,
      },
      growth: {
        users: 12.5,
        revenue: 8.3,
        conversion: -2.1,
      },
    });
    console.log("📊 Created analytics data");

    // Seed Revenue data for 2023 and 2024
    const revenueData2024 = [
      { month: "2024-01", year: 2024, monthName: "Jan", revenue: 12000 },
      { month: "2024-02", year: 2024, monthName: "Feb", revenue: 19000 },
      { month: "2024-03", year: 2024, monthName: "Mar", revenue: 15000 },
      { month: "2024-04", year: 2024, monthName: "Apr", revenue: 25000 },
      { month: "2024-05", year: 2024, monthName: "May", revenue: 22000 },
      { month: "2024-06", year: 2024, monthName: "Jun", revenue: 30000 },
      { month: "2024-07", year: 2024, monthName: "Jul", revenue: 28000 },
      { month: "2024-08", year: 2024, monthName: "Aug", revenue: 32000 },
      { month: "2024-09", year: 2024, monthName: "Sep", revenue: 35000 },
      { month: "2024-10", year: 2024, monthName: "Oct", revenue: 38000 },
      { month: "2024-11", year: 2024, monthName: "Nov", revenue: 42000 },
      { month: "2024-12", year: 2024, monthName: "Dec", revenue: 45000 },
    ];

    const revenueData2023 = [
      { month: "2023-01", year: 2023, monthName: "Jan", revenue: 10000 },
      { month: "2023-02", year: 2023, monthName: "Feb", revenue: 15000 },
      { month: "2023-03", year: 2023, monthName: "Mar", revenue: 12000 },
      { month: "2023-04", year: 2023, monthName: "Apr", revenue: 20000 },
      { month: "2023-05", year: 2023, monthName: "May", revenue: 18000 },
      { month: "2023-06", year: 2023, monthName: "Jun", revenue: 25000 },
      { month: "2023-07", year: 2023, monthName: "Jul", revenue: 23000 },
      { month: "2023-08", year: 2023, monthName: "Aug", revenue: 27000 },
      { month: "2023-09", year: 2023, monthName: "Sep", revenue: 30000 },
      { month: "2023-10", year: 2023, monthName: "Oct", revenue: 32000 },
      { month: "2023-11", year: 2023, monthName: "Nov", revenue: 35000 },
      { month: "2023-12", year: 2023, monthName: "Dec", revenue: 38000 },
    ];

    await Revenue.insertMany([...revenueData2023, ...revenueData2024]);
    console.log("💰 Created revenue data for 2023 and 2024");

    // Seed Traffic data (last 7 days)
    const today = new Date();
    const trafficData = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayOfWeek = daysOfWeek[date.getDay()];

      trafficData.push({
        date,
        dayOfWeek,
        organic: Math.floor(Math.random() * 2000) + 2800,
        direct: Math.floor(Math.random() * 1500) + 1900,
        referral: Math.floor(Math.random() * 1000) + 1200,
      });
    }

    await Traffic.insertMany(trafficData);
    console.log("🚦 Created traffic data for last 7 days");

    // Seed Sales data
    const salesData = [
      { category: "Electronics", amount: 45000, percentage: 35 },
      { category: "Clothing", amount: 32000, percentage: 25 },
      { category: "Books", amount: 19200, percentage: 15 },
      { category: "Home & Garden", amount: 12800, percentage: 10 },
      { category: "Sports", amount: 10240, percentage: 8 },
      { category: "Toys", amount: 6400, percentage: 5 },
      { category: "Other", amount: 2560, percentage: 2 },
    ];

    await Sales.insertMany(salesData);
    console.log("🛍️  Created sales data by category");

    // Seed User Growth data for 2024
    const userGrowthData = [
      { month: "2024-01", year: 2024, monthName: "Jan", newUsers: 1200 },
      { month: "2024-02", year: 2024, monthName: "Feb", newUsers: 1900 },
      { month: "2024-03", year: 2024, monthName: "Mar", newUsers: 1500 },
      { month: "2024-04", year: 2024, monthName: "Apr", newUsers: 2500 },
      { month: "2024-05", year: 2024, monthName: "May", newUsers: 2200 },
      { month: "2024-06", year: 2024, monthName: "Jun", newUsers: 3000 },
      { month: "2024-07", year: 2024, monthName: "Jul", newUsers: 2800 },
      { month: "2024-08", year: 2024, monthName: "Aug", newUsers: 3200 },
      { month: "2024-09", year: 2024, monthName: "Sep", newUsers: 3500 },
      { month: "2024-10", year: 2024, monthName: "Oct", newUsers: 3800 },
      { month: "2024-11", year: 2024, monthName: "Nov", newUsers: 4200 },
      { month: "2024-12", year: 2024, monthName: "Dec", newUsers: 4500 },
    ];

    await UserGrowth.insertMany(userGrowthData);
    console.log("👥 Created user growth data for 2024");

    console.log("\n✨ Database seeded successfully!");
    console.log("📝 Summary:");
    console.log("  - 1 analytics entry");
    console.log("  - 24 revenue entries (2023 + 2024)");
    console.log("  - 7 traffic entries (last 7 days)");
    console.log("  - 7 sales categories");
    console.log("  - 12 user growth entries (2024)");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
