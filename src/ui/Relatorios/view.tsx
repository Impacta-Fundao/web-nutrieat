"use client";

import { Dispatch, RefObject, SetStateAction } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Download, TrendingDown, TrendingUp, Minus, FileBarChart2, Medal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ComparisonData, MonthlySeriesItem, TopProductItem } from "./viewModel";

interface RelatoriosViewProps {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  years: number[];
  loading: boolean;
  error: string | null;
  comparison: ComparisonData;
  monthlySeries: MonthlySeriesItem[];
  topProducts: TopProductItem[];
  exportToPdf: () => Promise<void>;
  reportRef: RefObject<HTMLDivElement | null>;
}

const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const compareChartConfig = {
  vendas: { label: "Vendas", color: "#0f766e" },
};

const monthlyChartConfig = {
  quantidade_vendas: { label: "Qtd. vendas", color: "#ea580c" },
};

function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

const medalColors = [
  "text-yellow-500",
  "text-zinc-500 dark:text-zinc-300",
  "text-amber-700 dark:text-amber-400",
];

export default function RelatoriosView({
  year,
  setYear,
  month,
  setMonth,
  years,
  loading,
  error,
  comparison,
  monthlySeries,
  topProducts,
  exportToPdf,
  reportRef,
}: RelatoriosViewProps) {
  const trendConfig = {
    up: {
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      label: "Alta",
      valueClass: "text-emerald-500",
      badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    },
    down: {
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
      label: "Queda",
      valueClass: "text-red-500",
      badgeClass: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
    },
    stable: {
      icon: <Minus className="h-5 w-5 text-muted-foreground" />,
      label: "Estável",
      valueClass: "text-muted-foreground",
      badgeClass: "bg-muted text-muted-foreground border-border",
    },
  };

  const trend = trendConfig[comparison.trend];

  const compareBars = [
    { periodo: comparison.previousMonthName, vendas: comparison.previousSales },
    { periodo: comparison.currentMonthName, vendas: comparison.currentSales },
  ];

  const diffSign = comparison.difference > 0 ? "+" : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Nutrieat ADM</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">Relatórios Gerenciais</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Comparativo mensal e consolidado anual de vendas.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
              <SelectTrigger className="w-[155px]">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {MONTHS_PT.map((name, idx) => (
                    <SelectItem key={name} value={String(idx + 1)}>{name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="gap-2" onClick={exportToPdf}>
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </header>

        {/* Erro */}
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Não foi possível carregar os dados: {error}
          </div>
        )}

        <section ref={reportRef} className="space-y-6">

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {comparison.currentMonthName} — mês atual
              </p>
              <p className="mt-3 text-4xl font-bold text-foreground tabular-nums">
                {formatNumber(comparison.currentSales)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">unidades vendidas</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {comparison.previousMonthName} — mês anterior
              </p>
              <p className="mt-3 text-4xl font-bold text-foreground tabular-nums">
                {formatNumber(comparison.previousSales)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">unidades vendidas</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Variação no período
              </p>
              <div className="mt-3 flex items-center gap-2">
                {trend.icon}
                <p className={`text-4xl font-bold tabular-nums ${trend.valueClass}`}>
                  {diffSign}{formatNumber(comparison.difference)}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${trend.badgeClass}`}>
                  {trend.label} de {Math.abs(comparison.percentageChange).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileBarChart2 className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Comparativo mensal</h2>
              </div>
              {loading ? (
                <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
                  Carregando dados...
                </div>
              ) : (
                <ChartContainer config={compareChartConfig} className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={compareBars} barSize={48}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="periodo" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v) => formatNumber(v)} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <ChartTooltip
                        content={<ChartTooltipContent formatter={(v) => [formatNumber(Number(v)), "Vendas"]} />}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="vendas" fill="var(--color-vendas)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </article>

            {/* Top Produtos */}
            <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-foreground">Top 5 produtos no ano</h2>
              {topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados de produtos para o período selecionado.</p>
              ) : (
                <div className="space-y-3">
                  {topProducts.map((item, idx) => (
                    <div
                      key={`${item.nome_produto}-${item.mes_nome}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-base ${medalColors[idx] ?? "text-muted-foreground"}`}>
                          {idx < 3 ? <Medal className="h-4 w-4" /> : <span className="text-xs font-bold text-muted-foreground">{idx + 1}º</span>}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.nome_produto}</p>
                          <p className="text-xs text-muted-foreground">Melhor mês: {item.mes_nome}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground tabular-nums">
                          {formatNumber(item.total_vendido)}
                        </p>
                        <p className="text-xs text-muted-foreground">unidades</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>

          {/* Gráfico anual */}
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Evolução de vendas em {year}
            </h2>
            {loading ? (
              <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
                Carregando dados...
              </div>
            ) : (
              <ChartContainer config={monthlyChartConfig} className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="mes_nome" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => formatNumber(v)} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <ChartTooltip
                      content={<ChartTooltipContent formatter={(v) => [formatNumber(Number(v)), "Vendas"]} />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="quantidade_vendas" fill="var(--color-quantidade_vendas)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}