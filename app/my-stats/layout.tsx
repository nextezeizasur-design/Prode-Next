import { requireAuth } from "@/lib/auth"
import { MainNav } from "@/components/shared/main-nav"
import { BottomNav } from "@/components/shared/bottom-nav"
import { HowToPlay } from "@/components/shared/how-to-play"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()
  return (
    <div className="min-h-screen bg-background">
      <MainNav user={user} />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:pb-6">
        <div className="flex justify-end mb-4">
          <HowToPlay />
        </div>
        {children}
      </main>
      <BottomNav isAdmin={user.isAdmin} />
    </div>
  )
}
