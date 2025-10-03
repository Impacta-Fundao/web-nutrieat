import { ClienteModelData } from "@/models/clientes/types/clientes-props-model";
import { ColumnDef } from "@tanstack/react-table";
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
      console.log(resp.url)

      setUser(result.data.data);
    } catch (error) {
      const err = error as Error;
      console.error("Erro na requisição: ", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    user,
    error,
    fetchData,
    loading,
  };
}
