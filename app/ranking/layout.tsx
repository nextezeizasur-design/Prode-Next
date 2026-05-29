import { requireAuth } from "@/lib/auth"
import { MainNav } from "@/components/shared/main-nav"
import { BottomNav } from "@/components/shared/bottom-nav"

export default async function RankingLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()
  return (
    <div className="min-h-screen bg-background">
      <MainNav user={user} />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:pb-6">
        {children}
      </main>
      <BottomNav isAdmin={user.isAdmin} />
    </div>
  )
}
