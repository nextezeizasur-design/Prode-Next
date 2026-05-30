"use client"

import { useState, useTransition, useEffect } from "react"
import { adminToggleBlockUserAction, adminDeleteUserAction } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, ShieldOff, Trash2, Users } from "lucide-react"
import { format } from "date-fns"

export default function AdminUsersPage() {
  const [isPending, startTransition] = useTransition()
  const [users, setUsers] = useState<any[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    const res = await fetch("/api/admin/users")
    if (res.ok) setUsers(await res.json())
  }

  function toggleBlock(userId: string, isBlocked: boolean) {
    startTransition(async () => {
      await adminToggleBlockUserAction(userId, !isBlocked)
      await loadUsers()
    })
  }

  function deleteUser(userId: string) {
    startTransition(async () => {
      await adminDeleteUserAction(userId)
      setConfirmDelete(null)
      await loadUsers()
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-sm text-muted-foreground">{users.length} usuarios registrados</p>
        </div>
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {users.map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 px-4 py-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs bg-blue-600 text-white">
                    {user.nickname.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {user.firstName} {user.lastName}
                    </span>
                    {user.isAdmin && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                    {user.isBlocked && <Badge variant="destructive" className="text-xs">Bloqueado</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>@{user.nickname}</span>
                    <span>{user.email}</span>
                    <span className="hidden sm:inline">{user.totalPoints ?? 0} pts</span>
                    <span className="hidden sm:inline">
                      {format(new Date(user.createdAt), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                {!user.isAdmin && (
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Bloquear/Desbloquear */}
                    <Button
                      onClick={() => toggleBlock(user.id, user.isBlocked)}
                      disabled={isPending}
                      variant={user.isBlocked ? "outline" : "secondary"}
                      size="sm"
                      className="gap-1.5 text-xs"
                    >
                      {user.isBlocked
                        ? <><Shield className="h-3 w-3" /> Desbloquear</>
                        : <><ShieldOff className="h-3 w-3" /> Bloquear</>
                      }
                    </Button>

                    {/* Eliminar */}
                    {confirmDelete === user.id ? (
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => deleteUser(user.id)}
                          disabled={isPending}
                          variant="destructive"
                          size="sm"
                          className="text-xs"
                        >
                          Confirmar
                        </Button>
                        <Button
                          onClick={() => setConfirmDelete(null)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          No
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setConfirmDelete(user.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {users.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No hay usuarios registrados
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
