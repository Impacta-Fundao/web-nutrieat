import { ClienteModelData } from "@/models/clientes/types/clientes-props-model";
import { useEffect, useState } from "react";

export default function useClienteModel() {
  const [user, setUser] = useState<ClienteModelData[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const resp = await fetch("/api/clientes/clientesGetAll", {
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
      const result = await resp.json();
      setUser(result.data.data);
    } catch (error) {
      const err = error as Error;
      console.error("Erro na requisição: ", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteClient(id: string) {
    try {
      setError(null);
      setLoading(true);
      const resp = await fetch(`/api/clientes/cliente-delete?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok)
        throw new Error(`Erro - ${resp.status} : ${resp.statusText}`);

      const result = await resp.json();
      return result;
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      console.error("Erro ao deletar produto: ", error);
      throw error;
    } finally {
      fetchData();
      setInterval(() => {
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    user,
    error,
    fetchData,
    deleteClient,
    loading,
  };
}
