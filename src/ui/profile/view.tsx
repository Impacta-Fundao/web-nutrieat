import Loading from "@/components/ui/animation/loading";
import { AdmById } from "@/models/admin/types/admin-props-model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ProfileViewModelProps {
  admin: AdmById | undefined;
  router: AppRouterInstance;
  loading: boolean;
}

export default function ProfileView({
  admin,
  router,
  loading,
}: ProfileViewModelProps) {
  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <section className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
            {admin?.nome.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
              {admin?.nome}
            </h1>
            <p className="mt-2 text-sm text-slate-500">Dados do usuário</p>
            {/* {message && <span className="text-red-400">{message}</span>} */}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  router.back();
                }}
                className={`px-4 py-2 rounded-md text-sm transition bg-indigo-600 text-white hover:bg-indigo-700
               `}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>

        <form
          id="profile-form"
          // onSubmit={handleSubmit(handleSave)}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Contato</h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3 mb-2">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">
                Celular
              </span>

              <span className="text-sm text-slate-700">{admin?.celular}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">Email</span>

              <span className="text-sm text-slate-700">{admin?.email}</span>

              {/* {errors.email && (
              <span className="mx-2 text-xs text-red-400">
                {errors.email.message}
              </span>
            )} */}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Identificação
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3 mb-2">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">CPF</span>

              <span className="text-sm text-slate-700">
                {admin?.cpf || "CPF"}
              </span>

              {/* {errors.cnpj && (
              <span className="mx-2 text-xs text-red-400">
                {errors.cnpj.message}
              </span>
            )} */}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">Senha</span>

              <span className="text-sm text-slate-700">••••••••</span>

              {/* {errors.senha && (
              <span className="mx-2 text-xs text-red-400">
                {errors.senha.message}
              </span>
            )} */}
            </div>
          </div>
        </form>

        <div className="mt-8 bg-white rounded-xl border border-slate-100 p-4 shadow-sm sm:col-span-2">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Atividades recentes
          </h3>
          <p className="text-sm text-slate-600">Nenhuma atividade recente</p>
        </div>
      </section>
    </main>
  );
}
