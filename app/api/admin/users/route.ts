import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  await requireAdmin()
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, nickname: true, email: true, firstName: true,
      lastName: true, curso: true, isAdmin: true, isBlocked: true,
      totalPoints: true, createdAt: true,
    },
  })
  return NextResponse.json(users)
}
