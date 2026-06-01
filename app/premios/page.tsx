import Link from "next/link";
import { Trophy, BookOpen, BadgePercent, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const podium = [
  {
    place: 1,
    emoji: "🥇",
    label: "Campeón",
    accent: "border-amber-400/40 bg-amber-400/5",
    prizes: [
      { icon: "ball",   text: "Pelota oficial FIFA reglamentaria",      type: "material" },
      { icon: "exam",   text: "Examen final 100% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",  text: "15% descuento en la próxima cuota",      type: "cuota"    },
    ],
  },
  {
    place: 2,
    emoji: "🥈",
    label: "2.° puesto",
    accent: "border-slate-400/30 bg-slate-400/5",
    prizes: [
      { icon: "ball",   text: "Pelota de fútbol (medida 5)",            type: "material" },
      { icon: "exam",   text: "Examen final 75% bonificado (1 nivel)",  type: "academic" },
      { icon: "cuota",  text: "10% descuento en la próxima cuota",      type: "cuota"    },
    ],
  },
  {
    place: 3,
    emoji: "🥉",
    label: "3.° puesto",
    accent: "border-orange-400/30 bg-orange-400/5",
    prizes: [
      { icon: "trophy", text: "Artículo deportivo",                     type: "material" },
      { icon: "exam",   text: "Examen final 50% bonificado (1 nivel)",  type: "academic" },
      { icon: "cuota",  text: "5% descuento en la próxima cuota",       type: "cuota"    },
    ],
  },
];

const rest = [
  {
    range: "4.° y 5.° puesto",
    prizes: [
      { icon: "exam",    text: "Examen final 30% bonificado (1 nivel)", type: "academic" },
      { icon: "cuota",   text: "5% descuento en la próxima cuota",      type: "cuota"    },
      { icon: "diploma", text: "Diploma de participación destacada",    type: "diploma"  },
    ],
  },
  {
    range: "6.° al 10.° puesto",
    prizes: [
      { icon: "cuota",   text: "5% descuento en la próxima cuota",   type: "cuota"   },
      { icon: "diploma", text: "Diploma de participación destacada", type: "diploma" },
    ],
  },
];

function PrizeBadge({ type, text, icon }: { type: string; text: string; icon: string }) {
  const styles: Record<string, string> = {
    material: "bg-amber-400/10 border-amber-400/25 text-amber-200",
    academic: "bg-[#652f8d]/20 border-[#652f8d]/40 text-purple-200",
    cuota:    "bg-emerald-400/10 border-emerald-400/25 text-emerald-200",
    diploma:  "bg-sky-400/10 border-sky-400/25 text-sky-200",
  };
  const icons: Record<string, React.ReactNode> = {
    ball:    <span className="text-sm leading-none">⚽</span>,
    trophy:  <Trophy className="h-3.5 w-3.5 shrink-0" />,
    exam:    <BookOpen className="h-3.5 w-3.5 shrink-0" />,
    cuota:   <BadgePercent className="h-3.5 w-3.5 shrink-0" />,
    diploma: <Award className="h-3.5 w-3.5 shrink-0" />,
  };
  return (
    <div className={cn("flex items-center gap-2 rounded-xl border px-3 py-2 text-sm", styles[type])}>
      {icons[icon]}
      <span>{text}</span>
    </div>
  );
}

export default function PremiosPage() {
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
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#652f8d]/10 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
          ← Volver
        </Link>
        <div className="h-8 w-8 rounded-lg bg-[#652f8d] flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 pt-2">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#652f8d]/30 bg-[#652f8d]/15 px-4 py-1.5 text-sm font-medium text-purple-300">
            <Trophy className="h-4 w-4" />
            Mundial 2026
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Premios del Prode
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Top 10 del ranking final al cierre del Mundial.<br />
            Los beneficios académicos y descuentos en cuota aplican solo a alumnos.
          </p>
        </div>

        {/* Podio — orden fijo: 1° siempre primero */}
        <div className="mb-4 flex flex-col gap-3 sm:grid sm:grid-cols-3">
          {podium.map((p) => (
            <div
              key={p.place}
              className={cn(
                "rounded-2xl border p-4",
                p.accent,
                false
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-3xl leading-none">{p.emoji}</span>
                <p className="text-xs text-slate-400">{p.label}</p>
              </div>
              <div className="flex flex-col gap-2">
                {p.prizes.map((prize, i) => (
                  <PrizeBadge key={i} {...prize} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4-10 */}
        <div className="flex flex-col gap-3">
          {rest.map((r) => (
            <div key={r.range} className="rounded-2xl border border-white/8 bg-white/3 px-4 py-4">
              <p className="mb-3 text-sm font-medium text-slate-300">{r.range}</p>
              <div className="flex flex-col gap-2">
                {r.prizes.map((prize, i) => (
                  <PrizeBadge key={i} {...prize} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          En caso de empate en puntos, desempata quien realizó su primera predicción antes.
        </p>
      </div>
    </main>
  );
}
