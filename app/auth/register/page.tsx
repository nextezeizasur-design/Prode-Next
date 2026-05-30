"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { registerAction, checkNicknameAction } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  firstName: z.string().min(2, "Mínimo 2 caracteres"),
  lastName: z.string().min(2, "Mínimo 2 caracteres"),
  nickname: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  curso: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type NicknameStatus = "idle" | "checking" | "available" | "taken";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const checkNickname = useDebouncedCallback(async (value: string) => {
    if (value.length < 3 || !/^[a-zA-Z0-9_]+$/.test(value)) return;
    setNicknameStatus("checking");
    const { available } = await checkNicknameAction(value);
    setNicknameStatus(available ? "available" : "taken");
  }, 500);

  const onSubmit = (data: FormData) => {
    if (nicknameStatus === "taken") {
      toast({ title: "Ese nickname ya está en uso", variant: "destructive" });
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => v && formData.set(k, v as string));
      const result = await registerAction(formData);
      if (result.success) {
        toast({ title: "¡Cuenta creada! Bienvenido 🎉" });
        router.push("/fixture");
        router.refresh();
      } else {
        toast({ title: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img src="/logo.png" alt="Next English Institute" className="h-12 w-auto" />
          </div>
          <h1 className="text-xl font-bold text-white">Crear cuenta</h1>
          <p className="mt-1 text-sm text-slate-400">Unite al Next World Cup 2026</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Nombre</label>
              <input
                {...register("firstName")}
                placeholder="Ana"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Apellido</label>
              <input
                {...register("lastName")}
                placeholder="García"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Nickname <span className="text-slate-500">(público, único)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">@</span>
              <input
                {...register("nickname", { onChange: (e) => checkNickname(e.target.value) })}
                placeholder="goat_predictor"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-8 pr-10 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {nicknameStatus === "checking" && <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />}
                {nicknameStatus === "available" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {nicknameStatus === "taken" && <XCircle className="h-4 w-4 text-red-400" />}
              </div>
            </div>
            {errors.nickname && <p className="mt-1 text-xs text-red-400">{errors.nickname.message}</p>}
            {nicknameStatus === "taken" && <p className="mt-1 text-xs text-red-400">Nickname no disponible</p>}
            {nicknameStatus === "available" && <p className="mt-1 text-xs text-green-400">Nickname disponible ✓</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="vos@email.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              placeholder="Mín. 8 caracteres"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Curso <span className="text-slate-500">(opcional)</span>
            </label>
            <input
              {...register("curso")}
              placeholder="ej. Upper Intermediate B"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-[#652f8d] focus:outline-none focus:ring-1 focus:ring-[#652f8d] transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || nicknameStatus === "taken"}
            className="w-full rounded-xl bg-[#652f8d] py-3 text-sm font-semibold text-white hover:bg-[#7a3aa8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tenés cuenta?{" "}
          <Link href="/auth/login" className="text-[#b06fd8] hover:text-[#c490e4]">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
