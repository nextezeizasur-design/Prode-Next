import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FixturePage() {
  const user = await requireAuth();

  const matchCount = await prisma.match.count();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Fixture</h1>
      <p className="text-slate-400">Bienvenido, @{user.nickname}</p>
      <p className="text-slate-400 mt-2">Partidos cargados: {matchCount}</p>
      <p className="text-sm text-green-400 mt-4">✓ Conexión a DB OK</p>
    </div>
  );
}
