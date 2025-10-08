"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Janeiro", lanches: 19 },
  { month: "Fevereiro", lanches: 305 },
  { month: "Março", lanches: 237 },
  { month: "Abril", lanches: 73 },
  { month: "Maio", lanches: 209 },
  { month: "Junho", lanches: 214 },
  { month: "Julho", lanches: 45 },
  { month: "Agosto", lanches: 45 },
  { month: "Setembro", lanches: 80 },
  { month: "Outubro", lanches: 90 },
  { month: "Novembro", lanches: 214 },
];



export function ChartComponent({ config }: { config: ChartConfig }) {
  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border mt-5"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="lanches" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
