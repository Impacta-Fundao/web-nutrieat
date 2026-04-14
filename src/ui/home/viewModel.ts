import { ChartConfig } from "@/components/ui/chart";
import {
  ProductsData,
  ProductsItem,
} from "@/pages/api/vendas/vendas-quantity-month";
import { VendaItem, VendaResponse } from "@/pages/api/vendas/vendas-year-month";
import { useEffect, useState } from "react";

export type data = {
  key: string;
  value: string | number | boolean;
};

export default function useHomeModel() {
  const [dataVendas, setDataVendas] = useState<VendaResponse>();
  const [productVendas, setProductVendas] = useState<ProductsData>();
  const [yearVenda, setYearVenda] = useState<number>(new Date().getFullYear());
  const [yearProduct, setYearProduct] = useState<number>(
    new Date().getFullYear(),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchProductsPerYear(year: number) {
    try {
      setLoading(true);
      const resp = await fetch(
        `/api/vendas/vendas-quantity-month?year=${year}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!resp.ok) {
        setLoading(false);
        setError(resp.statusText);
        throw new Error(`Erro na requisição: ${resp.status}`);
      }
      const result: ProductsData = await resp.json();
      setProductVendas(result);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPurchases(year: number) {
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

  const chartConfigVendas = {
    lanches: {
      label: "Lanches",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const chartConfigProducts = {
    total_vendido: {
      label: "Total Vendido",
      color: "#10b981",
    },
  } satisfies ChartConfig;

  const chartDataPurchases: VendaItem[] | undefined = dataVendas?.meses;
  const chartDataProducts: ProductsItem[] | undefined = productVendas?.meses;

  const select = [2023, 2024, 2025, 2026];

  useEffect(() => {
    fetchPurchases(yearVenda);
  }, [yearVenda]);

  useEffect(() => {
    fetchProductsPerYear(yearProduct);
  }, [yearProduct]);

  return {
    chartConfigVendas,
    chartConfigProducts,
    chartDataPurchases,
    chartDataProducts,

    dataKeyTitleVendas: "mes_nome",
    dataKeyContentVendas: "quantidade_vendas",
    dataTitleProducts: "mes_nome",
    dataContentProsucts: "total_vendido",

    dataVendas,
    productVendas,

    select,
    yearProduct,
    yearVenda,
    setYearVenda,
    setYearProduct,

    loading,
  };
}
