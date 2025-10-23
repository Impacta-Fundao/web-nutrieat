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



export function ChartComponent({
  config,
  dataKeyTitle,
  dataKeyContent,
  tickLine,
  tickMargin,
  axisLine,
  data,
}: {
  config: ChartConfig;
  dataKeyTitle: string;
  dataKeyContent: string;
  tickLine: boolean;
  tickMargin: number;
  axisLine: boolean;
  data: any;
}) {
  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border mt-5"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical />
        <XAxis
          dataKey={dataKeyTitle}
          tickLine={tickLine}
          tickMargin={tickMargin}
          axisLine={axisLine}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={dataKeyContent} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
