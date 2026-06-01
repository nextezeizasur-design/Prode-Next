import { MainNav } from "@/components/shared/main-nav";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Trophy, Star, Medal, Award, Shirt, BookOpen, BadgePercent } from "lucide-react";
import { cn } from "@/lib/utils";

const podium = [
  {
    place: 1,
    emoji: "🥇",
    label: "Campeón",
    accent: "from-amber-400/20 to-amber-300/5 border-amber-400/40",
    badgeBg: "bg-amber-400/15 text-amber-600 dark:text-amber-300 border-amber-400/30",
    iconColor: "text-amber-500",
    prizes: [
      { icon: "ball",    text: "Pelota oficial FIFA reglamentaria",   type: "material" },
      { icon: "exam",    text: "Examen final 100% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",   text: "15% descuento en la próxima cuota",   type: "cuota" },
    ],
  },
  {
    place: 2,
    emoji: "🥈",
    label: "2.° puesto",
    accent: "from-slate-400/20 to-slate-300/5 border-slate-400/30",
    badgeBg: "bg-slate-400/15 text-slate-600 dark:text-slate-300 border-slate-400/30",
    iconColor: "text-slate-400",
    prizes: [
      { icon: "ball",    text: "Pelota de fútbol (medida 5)",          type: "material" },
      { icon: "exam",    text: "Examen final 75% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",   text: "10% descuento en la próxima cuota",    type: "cuota" },
    ],
  },
  {
    place: 3,
    emoji: "🥉",
    label: "3.° puesto",
    accent: "from-orange-400/20 to-orange-300/5 border-orange-400/30",
    badgeBg: "bg-orange-400/15 text-orange-600 dark:text-orange-300 border-orange-400/30",
    iconColor: "text-orange-400",
    prizes: [
      { icon: "trophy",  text: "Artículo deportivo",                   type: "material" },
      { icon: "exam",    text: "Examen final 50% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",   text: "5% descuento en la próxima cuota",     type: "cuota" },
    ],
  },
];

const rest = [
  {
    range: "4.° y 5.° puesto",
    prizes: [
      { icon: "exam",   text: "Examen final 30% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",  text: "5% descuento en la próxima cuota",      type: "cuota" },
      { icon: "diploma",text: "Diploma de participación destacada",    type: "diploma" },
    ],
  },
  {
    range: "6.° al 10.° puesto",
    prizes: [
      { icon: "cuota",  text: "5% descuento en la próxima cuota",   type: "cuota" },
      { icon: "diploma",text: "Diploma de participación destacada", type: "diploma" },
    ],
  },
];

function PrizeIcon({ icon, type }: { icon: string; type: string }) {
  const base = "h-4 w-4 shrink-0 mt-0.5";
  if (icon === "ball")    return <span className={cn(base, "text-lg leading-none")}>⚽</span>;
  if (icon === "trophy")  return <Trophy className={cn(base, "text-orange-400")} />;
  if (icon === "exam")    return <BookOpen className={cn(base, "text-violet-500")} />;
  if (icon === "cuota")   return <BadgePercent className={cn(base, "text-emerald-500")} />;
  if (icon === "diploma") return <Award className={cn(base, "text-sky-500")} />;
  return <Star className={cn(base, "text-muted-foreground")} />;
}

function PrizeBadge({ type, text, icon }: { type: string; text: string; icon: string }) {
  const colors: Record<string, string> = {
    material: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200",
    academic: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/40 text-violet-900 dark:text-violet-200",
    cuota:    "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200",
    diploma:  "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/40 text-sky-900 dark:text-sky-200",
  };
  return (
    <div className={cn("flex items-start gap-2 rounded-xl border px-3 py-2 text-sm", colors[type])}>
      <PrizeIcon icon={icon} type={type} />
      <span>{text}</span>
    </div>
  );
}

export default function PremiosPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="mx-auto max-w-2xl px-4 pb-32 pt-6">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#652f8d]/20 bg-[#652f8d]/10 px-4 py-1.5 text-sm font-medium text-[#652f8d] dark:text-purple-300">
            <Trophy className="h-4 w-4" />
            Mundial 2026
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Premios del Prode
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Top 10 del ranking final al cierre del Mundial.
            Los beneficios académicos y descuentos en cuota aplican solo a alumnos.
          </p>
        </div>

        {/* Leyenda */}
        <div className="mb-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400"></span>Premio material</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-500"></span>Beneficio académico</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>Descuento en cuota</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-500"></span>Diploma</span>
        </div>

        {/* Podio — 3 cards */}
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {podium.map((p) => (
            <div
              key={p.place}
              className={cn(
                "relative rounded-2xl border bg-gradient-to-b p-4",
                p.accent,
                p.place === 1 && "sm:order-2 sm:scale-[1.03] sm:shadow-lg"
              )}
            >
              {/* Emoji + puesto */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-3xl leading-none">{p.emoji}</span>
                <div>
                  <p className="text-xs text-muted-foreground">{p.label}</p>
                </div>
              </div>

              {/* Premios */}
              <div className="flex flex-col gap-2">
                {p.prizes.map((prize, i) => (
                  <PrizeBadge key={i} {...prize} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resto top 4-10 */}
        <div className="flex flex-col gap-3">
          {rest.map((r) => (
            <div
              key={r.range}
              className="rounded-2xl border border-border/60 bg-card px-4 py-4"
            >
              <p className="mb-3 text-sm font-medium text-foreground">{r.range}</p>
              <div className="flex flex-col gap-2">
                {r.prizes.map((prize, i) => (
                  <PrizeBadge key={i} {...prize} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          En caso de empate en puntos, desempata quien realizó su primera predicción antes.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
