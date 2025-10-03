import {
  ApiResponse,
  ProdutoFormData,
  ProdutosModelData,
} from "@/models/produtos/types/produtos-props-model";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useProdutosModel() {
  const [data, setData] = useState<Array<ProdutosModelData>>([]);
  const [produto, setProduto] = useState<ProdutosModelData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [produtoEditando, setProdutoEditando] =
    useState<ProdutosModelData | null>(null);
  const [status, setStatus] = useState<boolean>(false);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errosCreate },
  } = useForm<ProdutoFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
    formState: { errors: errosEdit },
  } = useForm<ProdutoFormData>();

  const iniciarEdicao = (produto: ProdutosModelData) => {
    setProdutoEditando(produto);
    setValue("nome", produto.nome);
    setValue("preco", Number(produto.preço));
  };

  const cancelarEdicao = () => {
    setProdutoEditando(null);
    resetEdit();
  };

  const onSubmitCreate: SubmitHandler<ProdutoFormData> = async (formData) => {
    try {
      await createProduto({
        nome: formData.nome,
        preco: formData.preco,
      });
      resetCreate();
      await fetchData();
    } catch (error) {
      console.error("Erro no onSubmitCreate");
    }
  };

  const onSubmitEdit: SubmitHandler<ProdutoFormData> = async (formData) => {
    try {
      if (produtoEditando) {
        await editProduto(produtoEditando.id.toString(), {
          nome: formData.nome,
          preco: formData.preco,
        });
        setStatus(true);
        setTimeout(() => {
          setStatus(false);
        }, 3000);
        cancelarEdicao();
        await fetchData();
      }
    } catch (error) {
      console.error("Erro no onSubmitEdit:", error);
    }
  };

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("/api/produtos/produtos", {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();
      const dadosConvertido = result.data.data.map((item: any) => ({
        ...item,
        preco:
          typeof item.preço === "string"
            ? parseFloat(item.preço)
            : item.preço || 0,
      }));
      setData(dadosConvertido);
    } catch (err) {
      const error = err as Error;
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // async function fetchProdutoById(id: number) {
  //   try {
  //     setLoading(true);
  //     setProduto(null);
  //     const resp = await fetch(`/api/produtos/produtos?id=${id}`);
  //     if (!resp.ok) throw new Error(`Erro ${resp.status}: ${resp.statusText}`);

  //     const result: ApiResponseId = await resp.json();
  //     setProduto(result.data);
  //     return result.data;
  //   } catch (error) {
  //     const err = error as Error;
  //     setError(err.message);
  //     console.error("Erro ao buscar produto: ", err);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const createProduto = async (produtoData: ProdutoFormData) => {
    try {
      setError(null);
      const precoNumerico = parseFloat(String(produtoData.preco));

      const response = await fetch("/api/produtos/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: produtoData.nome,
          preco: precoNumerico,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result: ProdutosModelData = await response.json();
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  };

  const editProduto = async (id: string, produtoData: ProdutoFormData) => {
    try {
      setError(null);
      setLoading(true);

      const precoNumerico = parseFloat(String(produtoData.preco));

      const response = await fetch(`/api/produtos/produtos?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: produtoData.nome,
          preco: precoNumerico,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Erro ao editar produto:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduto = async (id: string) => {
    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(`/api/produtos/produtos?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) {
        throw new Error(`Erro - ${resp.status} : ${resp.statusText}`);
      }

      const result = await resp.json();
      return result;
    } catch (error) {
      const erro = error as Error;
      setError(erro.message);
      console.error("Erro ao Deletar produto:", error);
      throw error;
    } finally {
      setLoading(false);
      fetchData()
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    produto,
    deleteProduto,
    registerCreate,
    handleSubmitCreate,
    onSubmitCreate,
    errosCreate,
    resetCreate,
    registerEdit,
    handleSubmitEdit,
    onSubmitEdit,
    errosEdit,
    resetEdit,
    error,
    produtoEditando,
    iniciarEdicao,
    status,
  };
}
