import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { FixturePhaseSection } from "@/components/fixture/fixture-phase-section";
import { SemifinalistPicksCard } from "@/components/fixture/semifinalist-picks-card";
import type { MatchPhase } from "@/types";

const PHASE_ORDER: MatchPhase[] = [
  "GROUP",
  "ROUND_OF_32",
  "ROUND_OF_16",
  "QUARTER_FINAL",
  "SEMI_FINAL",
  "THIRD_PLACE",
  "FINAL",
];

const PHASE_LABELS: Record<MatchPhase, string> = {
  GROUP: "Group Stage",
  ROUND_OF_32: "Round of 32",
  ROUND_OF_16: "Round of 16",
  QUARTER_FINAL: "Quarter-finals",
  SEMI_FINAL: "Semi-finals",
  THIRD_PLACE: "Third place",
  FINAL: "Final",
};

export const dynamic = "force-dynamic";

export default async function FixturePage() {
  const user = await requireAuth();

  const [matches, userPredictions, semiPicks, teams] = await Promise.all([
    prisma.match.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: { kickoffAt: "asc" },
    }),
    prisma.prediction.findMany({
      where: { userId: user.id },
    }),
    prisma.semifinalistPick.findMany({
      where: { userId: user.id },
      include: { team: true },
    }),
    prisma.team.findMany({ orderBy: { name: "asc" } }),
  ]);

  const byPhase = PHASE_ORDER.reduce(
    (acc, phase) => {
      const phaseMatches = matches.filter((m) => m.phase === phase);
      if (phaseMatches.length > 0) acc[phase] = phaseMatches;
      return acc;
    },
    {} as Record<MatchPhase, typeof matches>
  );

  const predMap = Object.fromEntries(
    userPredictions.map((p) => [p.matchId, p])
  );

  const semiTeamIds = new Set(semiPicks.map((s) => s.teamId));
  const semiTeams = semiPicks.map((s) => s.team);

  // Check if semis have started
  const firstSemi = matches.find((m) => m.phase === "SEMI_FINAL");
  const semiLocked = firstSemi
    ? firstSemi.predictionsLocked || firstSemi.kickoffAt <= new Date()
    : false;

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">⚽</div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Fixture no disponible todavía
        </h2>
        <p className="text-slate-400 text-sm max-w-sm">
          Los partidos se cargarán próximamente. ¡Volvé antes del 11 de junio!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Semifinalist picks */}
      <SemifinalistPicksCard
        teams={teams}
        selectedTeamIds={Array.from(semiTeamIds)}
        userId={user.id}
        locked={semiLocked}
      />

      {/* Phases */}
      {PHASE_ORDER.filter((phase) => byPhase[phase]).map((phase) => (
        <FixturePhaseSection
          key={phase}
          phase={phase}
          label={PHASE_LABELS[phase]}
          matches={byPhase[phase]}
          predMap={predMap}
          userId={user.id}
        />
      ))}
    </div>
  );
}
