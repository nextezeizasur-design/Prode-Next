import Link from "next/link";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { AnnouncementBanner } from "@/components/shared/announcement-banner";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Trophy } from "lucide-react";

export default async function HomePage() {
  const [user, pinnedAnnouncement] = await Promise.all([
    getCurrentUser(),
    prisma.announcement.findFirst({
      where: { pinned: true, active: true },
    }).catch(() => null),
  ]);

  const tournamentStart = new Date("2026-06-11T17:00:00Z");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#652f8d]/10 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#652f8d] flex items-center justify-center"><span className="text-white font-bold text-sm">N</span></div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/fixture"
              className="rounded-full bg-[#652f8d] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#7a3aa8] transition-colors"
            >
              Ir al fixture
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-[#652f8d] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#7a3aa8] transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Announcement */}
      {pinnedAnnouncement && (
        <div className="relative z-10 px-4">
          <AnnouncementBanner announcement={pinnedAnnouncement} />
        </div>
      )}

      {/* Hero */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-400">
          <span>⚽</span>
          <span>FIFA World Cup 2026</span>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Next{" "}
          <span className="text-[#9855c8]">Prode</span>
        </h1>

        <p className="mb-8 text-lg text-slate-400">
          Predecí los resultados, acumulá puntos y competí contra toda la comunidad Next.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {user ? (
            <Link
              href="/fixture"
              className="rounded-full bg-[#652f8d] px-8 py-3 text-base font-semibold text-white hover:bg-[#7a3aa8] transition-colors"
            >
              Ver fixture →
            </Link>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="rounded-full bg-[#652f8d] px-8 py-3 text-base font-semibold text-white hover:bg-[#7a3aa8] transition-colors"
              >
                Registrarse gratis
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-white/20 px-8 py-3 text-base font-medium text-slate-300 hover:bg-white/5 transition-colors"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Countdown */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-12">
        <CountdownTimer targetDate={tournamentStart} />
      </div>

      {/* Features pills */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { emoji: "🌐", label: "Predecí cada partido" },
            { emoji: "🏆", label: "Ranking semanal" },
            { emoji: "🔥", label: "Win streaks" },
            { emoji: "📊", label: "Stats & logros" },
            { emoji: "🎯", label: "Bonus exact score" },
            { emoji: "🎁", label: "Premios", href: "/premios" },
          ].map((f) =>
            f.href ? (
              <Link
                key={f.label}
                href={f.href}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:border-[#652f8d]/50 hover:text-white transition-all"
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </Link>
            ) : (
              <div
                key={f.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Sistema de puntos */}
      <div className="relative z-10 mx-auto max-w-xl px-6 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-center text-lg font-semibold text-white">
            Sistema de puntos
          </h2>
          <div className="space-y-0 divide-y divide-white/10">
            <div className="flex items-center justify-between py-4">
              <span className="text-slate-300">Exact score</span>
              <span className="font-semibold text-amber-400">3 pts</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-slate-300">Correct winner / draw</span>
              <span className="font-semibold text-[#9855c8]">1 pt</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-slate-300">Cada semifinalista correcto</span>
              <span className="font-semibold text-emerald-400">+2 pts bonus</span>
            </div>
          </div>

          {/* Ver premios */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <Link
              href="/premios"
              className="inline-flex items-center gap-2 rounded-full border border-[#652f8d]/50 bg-[#652f8d]/15 px-5 py-2 text-sm font-medium text-[#c490e4] hover:bg-[#652f8d]/25 hover:text-white transition-all"
            >
              <Trophy className="h-4 w-4" />
              Ver premios
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
