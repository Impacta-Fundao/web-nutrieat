import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsViewProps } from "@/models/admin/types/admin-account-model";

export default function SettingsView({
  account,
  loading,
  saving,
  error,
  successMessage,
  register,
  handleSubmit,
  errors,
  onSubmit,
}: SettingsViewProps) {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Settings da Conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Confira seus dados de administrador e mantenha sua conta atualizada.
          </p>

          {loading ? (
            <div className="mt-6 space-y-3">
              <div className="h-10 rounded-md bg-muted" />
              <div className="h-10 rounded-md bg-muted" />
              <div className="h-10 rounded-md bg-muted" />
              <div className="h-10 rounded-md bg-muted" />
            </div>
          ) : (
            <dl className="mt-6 space-y-4">
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">ID</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{account?.id ?? "-"}</dd>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Nome</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{account?.nome ?? "-"}</dd>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">CPF</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{account?.cpf ?? "-"}</dd>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Celular</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{account?.celular ?? "-"}</dd>
              </div>
            </dl>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Editar Conta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Você pode alterar seu email e senha a qualquer momento.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
              {successMessage}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="Digite seu novo email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Informe um email válido",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Nova senha</label>
              <Input
                type="password"
                placeholder="Deixe em branco para não alterar"
                {...register("senha", {
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              {errors.senha && (
                <p className="mt-2 text-sm text-destructive">{errors.senha.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading || saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
