import {
  ApiResponseData,
  ClienteModelData,
} from "@/models/clientes/types/clientes-props-model";
import { useEffect, useState } from "react";

export default function usePreviewUser(params: { id: string }) {
  const [data, setData] = useState<{data : ClienteModelData}>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  async function fetchData() {
    try {
      setLoading(true);
      const resp = await fetch(`/api/clientes/cliente-get?id=${params.id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) {
        setLoading(false);
        throw new Error(`Erro na requsisição: ${resp.status}`);
      }
      const result = await resp.json();
      setData(result);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
