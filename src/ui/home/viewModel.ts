import { ChartConfig } from "@/components/ui/chart";

export type data = {
  key: string;
  value: string | number | boolean;
};

export default function useHomeModel() {
  const chartConfig = {
    lanches: {
      label: "Lanches",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const chartData: data[] = [
    { key: "Janeiro", value: 19 },
    { key: "Fevereiro", value: 305 },
    { key: "Março", value: 237 },
    { key: "Abril", value: 73 },
    { key: "Maio", value: 209 },
    { key: "Junho", value: 214 },
    { key: "Julho", value: 45 },
    { key: "Agosto", value: 45 },
    { key: "Setembro", value: 80 },
    { key: "Outubro", value: 90 },
    { key: "Novembro", value: 214 },
  ];

  return {
    chartConfig,
    chartData,
    dataKeyTitle: "key",
    dataKeyContent: "value",
  };
}
