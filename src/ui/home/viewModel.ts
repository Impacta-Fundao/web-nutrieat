import { ChartConfig } from "@/components/ui/chart";
import { VendaItem, VendaResponse } from "@/pages/api/vendas/vendas-year-month";
import { useEffect, useState } from "react";

export type data = {
  key: string;
  value: string | number | boolean;
};

export default function useHomeModel() {
  const [dataVendas, setDataVendas] = useState<VendaResponse>();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(year: number) {
    try {
      setLoading(true);
      const resp = await fetch(`/api/vendas/vendas-year-month?year=${year}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) {
        setLoading(false);
        throw new Error(`Erro na requisição: ${resp.status}`);
      }
      const result: VendaResponse = await resp.json();
      setDataVendas(result);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  const chartConfig = {
    lanches: {
      label: "Lanches",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const chartData: VendaItem[] | undefined = dataVendas?.meses;

  const select = [2023, 2024, 2025, 2026];

  useEffect(() => {
    fetchData(year);
  }, [year]);

  return {
    chartConfig,
    chartData,
    dataKeyTitle: "mes_nome",
    dataKeyContent: "quantidade_vendas",
    dataVendas,
    select,
    year,
    setYear,
    loading
  };
}
