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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProdutoFormData>();

  const onSubmit: SubmitHandler<ProdutoFormData> = async (formData) => {
    try {
      await createProduto({
        nome: formData.nome,
        preco: formData.preco,
      });
      reset();
      await fetchData();
    } catch (error) {
      console.error("Erro no onSubmit:", error);
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
      const precoNumerico = parseFloat(produtoData.preco);

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

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    produto,
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    error,
  };
}
