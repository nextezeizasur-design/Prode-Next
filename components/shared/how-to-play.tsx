"use client"

import { useState } from "react"
import { HelpCircle, X, Star, Trophy, Target, Users } from "lucide-react"

export function HowToPlay() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <HelpCircle className="h-4 w-4" />
        <span>¿Cómo jugar?</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold mb-1">¿Cómo jugar?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Next World Cup Prode — FIFA World Cup 2026
            </p>

            {/* Scoring */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Sistema de puntos
              </h3>

              <div className="flex items-center gap-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3">
                <Star className="h-5 w-5 text-yellow-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Exact score</p>
                  <p className="text-xs text-muted-foreground">Acertás el resultado exacto</p>
                </div>
                <span className="ml-auto text-lg font-bold text-yellow-500">3 pts</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#652f8d]/10 border border-[#652f8d]/20 p-3">
                <Target className="h-5 w-5 text-[#b06fd8] shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Correct winner / draw</p>
                  <p className="text-xs text-muted-foreground">Acertás quién gana o que empata</p>
                </div>
                <span className="ml-auto text-lg font-bold text-[#b06fd8]">1 pt</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 p-3">
                <Users className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Semifinalistas correctos</p>
                  <p className="text-xs text-muted-foreground">Por cada equipo que adivinás</p>
                </div>
                <span className="ml-auto text-lg font-bold text-green-500">+2 pts</span>
              </div>
            </div>

            {/* Rules */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Reglas
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#b06fd8] mt-0.5">•</span>
                  Las predicciones se cierran cuando empieza cada partido
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b06fd8] mt-0.5">•</span>
                  Podés modificar tu predicción hasta que cierre
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b06fd8] mt-0.5">•</span>
                  Los 4 semifinalistas se eligen antes de que arranquen las semis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b06fd8] mt-0.5">•</span>
                  El ranking se actualiza automáticamente después de cada partido
                </li>
              </ul>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#652f8d] py-3 text-sm font-semibold text-white hover:bg-[#7a3aa8] transition-colors"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
