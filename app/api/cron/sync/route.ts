import { NextResponse } from "next/server";
import { syncLiveMatches, lockUpcomingMatches } from "@/services/football-api";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await lockUpcomingMatches();
    const result = await syncLiveMatches();
    return NextResponse.json({
      success: true,
      updated: result.updated,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron sync failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
