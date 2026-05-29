"use client"

import { useState, useTransition } from "react"
import { adminSyncLiveAction, adminSyncFixturesAction, adminRecalculateScoresAction } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Activity, Calendar, Zap, CheckCircle, XCircle } from "lucide-react"

export default function AdminPage() {
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<Record<string, { ok: boolean; msg: string }>>({})

  function run(key: string, action: () => Promise<any>) {
    startTransition(async () => {
      try {
        const res = await action()
        setResults(r => ({ ...r, [key]: { ok: res?.success ?? true, msg: res?.error ?? "OK" } }))
      } catch (e: any) {
        setResults(r => ({ ...r, [key]: { ok: false, msg: e.message ?? "Error" } }))
      }
    })
  }

  const actions = [
    { key: "live", label: "Sync en vivo", icon: Activity, fn: adminSyncLiveAction },
    { key: "fixture", label: "Sync fixture", icon: Calendar, fn: adminSyncFixturesAction },
    { key: "scores", label: "Recalcular puntajes", icon: RefreshCw, fn: adminRecalculateScoresAction },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">World Cup 2026 — Panel de Control</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Acciones
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {actions.map(({ key, label, icon: Icon, fn }) => (
            <div key={key} className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={isPending}
                onClick={() => run(key, fn)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
              {results[key] && (
                results[key].ok
                  ? <CheckCircle className="h-4 w-4 text-green-400" />
                  : <XCircle className="h-4 w-4 text-red-400" title={results[key].msg} />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
