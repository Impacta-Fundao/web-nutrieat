import { ProdutoViewProps } from "@/models/produtos/types/produtos-props-model";
import { Check, X } from "lucide-react";

export default function ProdutosView({
  data,
  error,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  register,
}: ProdutoViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gerenciamento de Produtos Nutrieat
          </h1>
          <p className="text-lg text-gray-600">
            Cadastre e visualize todos os produtos da cantina
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Cadastrar Novo Produto
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <X /> Erro: {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit((data) => {
                console.log("Form data: ", data);
                onSubmit(data);
              })}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  {...register("nome", { required: "Nome é obrigatório" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ex: Hamburgão, Doguinho"
                />
                {errors.nome && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("preco", {
                      required: "Preço é obrigatório",
                      min: {
                        value: 0.01,
                        message: "Preço deve ser maior que zero",
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                {errors.preco && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.preco.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? "Carregando" : "Cadastrar"}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Produtos Cadastrados
              </h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {data.length} itens
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-gray-600 mb-4">Erro ao carregar produtos</p>
                <p className="text-sm text-gray-500">{error}</p>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto cadastrado
                </h3>
                <p className="text-gray-500">
                  Comece cadastrando seu primeiro produto!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.map((produto) => (
                  <div
                    key={produto.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {produto.nome}
                        </h3>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                          R$ {produto.preço}
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        ID: {produto.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-gray-600">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {data.length}
              </div>
              <div className="text-sm">Total de Produtos</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
