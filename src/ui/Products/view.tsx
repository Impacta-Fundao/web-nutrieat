import { Button } from "@/components/ui/button";
import { ProdutoViewProps } from "@/models/produtos/types/produtos-props-model";
import { Edit, Trash, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProdutosView({
  data,
  error,
  errosCreate,
  errosEdit,
  handleSubmitCreate,
  handleSubmitEdit,
  loading,
  onSubmitCreate,
  onSubmitEdit,
  registerCreate,
  registerEdit,
  iniciarEdicao,
  status,
  deleteProduto,
}: ProdutoViewProps) {
  const [isAtive, setIsAtive] = useState<boolean>(false);

  return (
    <div className="min-h-screen max-h-1/2 bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Gerenciamento de Produtos Nutrieat
          </h1>
          <p className="text-lg text-muted-foreground">
            Cadastre e visualize todos os produtos da cantina
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isAtive ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Atualizar Produto
                  {status && (
                    <p className="text-emerald-600 dark:text-emerald-400">Atualizado com sucesso</p>
                  )}
                </h2>
                <form
                  onSubmit={handleSubmitEdit((data) => {
                    onSubmitEdit(data);
                    setTimeout(() => {
                      setIsAtive(!isAtive);
                    }, 3000);
                  })}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome do Produto *
                    </label>
                    <input
                      {...registerEdit("nome", {
                        required: "Nome é obrigatório",
                      })}
                      className="w-full px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="Ex: Hamburgão, Doguinho"
                    />
                    {errosEdit.nome && (
                      <p className="mt-2 text-sm text-red-600">
                        {errosEdit.nome.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preço *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">
                        R$
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...registerEdit("preco", {
                          required: "Preço é obrigatório",
                          min: {
                            value: 0.01,
                            message: "Preço deve ser maior que zero",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                    {errosEdit.preco && (
                      <p className="mt-2 text-sm text-red-600">
                        {errosEdit.preco.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setIsAtive(!isAtive)}
                      className="border border-border bg-background text-foreground py-3 px-6 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? "Carregando" : "Salvar"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Cadastrar Novo Produto
              </h2>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6">
                  <X /> Erro: {error}
                </div>
              )}
              <form
                onSubmit={handleSubmitCreate((data) => {
                  console.log("Form data: ", data);
                  onSubmitCreate(data);
                })}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    {...registerCreate("nome", {
                      required: "Nome é obrigatório",
                    })}
                    className="w-full px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Hamburgão, Doguinho"
                  />
                  {errosCreate.nome && (
                    <p className="mt-2 text-sm text-red-600">
                      {errosCreate.nome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">
                      R$
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...registerCreate("preco", {
                        required: "Preço é obrigatório",
                        min: {
                          value: 0.01,
                          message: "Preço deve ser maior que zero",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  {errosCreate.preco && (
                    <p className="mt-2 text-sm text-red-600">
                      {errosCreate.preco.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? "Carregando" : "Cadastrar"}
                </button>
              </form>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Produtos Cadastrados
              </h2>

              <span className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                {data.length} itens
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto p-3">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <p className="text-muted-foreground mb-4">
                    Erro ao carregar produtos
                  </p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              ) : data.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-6xl mb-4">📦</div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum produto cadastrado
                  </h3>
                  <p className="text-muted-foreground">
                    Comece cadastrando seu primeiro produto!
                  </p>
                </div>
              ) : (
                <div>
                  <div className="space-y-2">
                    {data.map((produto) => (
                      <div
                        key={produto.id}
                        className="border border-border rounded-lg p-4 bg-background hover:bg-accent/20 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-lg">
                              {produto.nome}
                            </h3>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                              {produto.preco}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded border border-border">
                              ID: {produto.id}
                            </div>
                            <div className="text-muted-foreground hover:text-foreground hover:border-border hover:border hover:rounded-md transition">
                              <Edit
                                className="w-5 h-4 m-1"
                                onClick={() => {
                                  iniciarEdicao(produto);
                                  setIsAtive(!isAtive);
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <AlertDialog>
                              <AlertDialogTrigger className="text-muted-foreground hover:text-foreground hover:border-border hover:border hover:rounded-md transition">
                                <Trash className="w-5 h-4 m-1" />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Você tem certeza que quer continuar com essa
                                    ação?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Essa ação apagará esse registro da base de
                                    dados
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="hover:px-5">
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteProduto(String(produto.id))
                                    }
                                    className="bg-destructive text-white hover:bg-destructive/90"
                                  >
                                    Continuar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-primary">
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
