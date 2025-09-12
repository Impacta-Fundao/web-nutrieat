"use client";
import {
  ApiResponse,
  ApiResponseId,
  ProdutoData,
  ProdutosModel,
} from "@/models/produtos/types/produtos-props-model";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useProdutosModel() {
  const [data, setData] = useState<Array<ProdutosModel>>([]);
  const [produto, setProduto] = useState<ProdutosModel | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
   const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProdutoData>({
    defaultValues: { nome: "", preco: "" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ProdutoData> = async (formData) => {
    try {
      setLoading(true)
      setError(null)

      const produtoData:ProdutoData = {
        nome: formData.nome,
        preco: formData.preco
      }

      const resp = await fetchData()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful){
      reset()
      setIsSubmitSuccessful(false)
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("/api/produtos/produtos");

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();
      setData(result.data);
    } catch (err) {
      const error = err as Error;
      setLoading(false);
      throw new Error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProdutoById(id: number) {
    try {
      setLoading(true);
      setProduto(null);
      const resp = await fetch(`/api/produtos/produtos?id=${id}`);
      if (!resp.ok) throw new Error(`Erro ${resp.status}: ${resp.statusText}`);

      const result: ApiResponseId = await resp.json();
      setProduto(result.data);
      return result.data;
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      console.error("Erro ao buscar produto: ", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const createProduto = async (produtoData: ProdutoData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/produtos/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoData),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    produto,
  };
}
