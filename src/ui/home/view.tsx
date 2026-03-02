import { ChartConfig } from "@/components/ui/chart";
import { ChartComponent } from "./components/chart";
import { data } from "./viewModel";
import { VendaItem, VendaResponse } from "@/pages/api/vendas/vendas-year-month";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import {
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Filter,
} from "lucide-react";
import Loading from "@/components/ui/animation/loading";

export interface HomeViewProps {
  chartConfig: ChartConfig;
  dataKeyTitle: string;
  dataKeyContent: string;
  tickLine: boolean;
  tickMargin: number;
  axisLine: boolean;
  data: VendaItem[] | undefined;
  dataVendas: VendaResponse | undefined;
  select: number[];
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  loading: boolean
}

export default function HomeView({
  axisLine,
  chartConfig,
  data,
  dataKeyContent,
  dataKeyTitle,
  tickLine,
  tickMargin,
  dataVendas,
  select,
  setYear,
  year,
  loading
}: HomeViewProps) {
  // Calcular métricas básicas
  const totalVendas =
    dataVendas?.meses?.reduce(
      (acc, mes) => acc + (mes.quantidade_vendas || 0),
      0,
    ) || 0;
  const totalItens =
    dataVendas?.meses?.reduce(
      (acc, mes) => acc + (mes.quantidade_vendas || 0),
      0,
    ) || 0;
  const mediaMensal = dataVendas?.meses?.length
    ? (totalVendas / dataVendas.meses.length).toFixed(1)
    : 0;

  const monthTranslate = (val: string) => {
    switch (val.toLowerCase()) {
      case "january":
        return "Janeiro";
      case "february":
        return "Fevereiro";
      case "march":
        return "Março";
      case "april":
        return "Abril";
      case "may":
        return "Maio";
      case "june":
        return "Junho";
      case "july":
        return "Julho";
      case "august":
        return "Agosto";
      case "september":
        return "Setembro";
      case "october":
        return "Outubro";
      case "november":
        return "Novembro";
      case "december":
        return "Dezembro";
      default:
        break;
    }
  };

  if (loading) return <Loading/>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="container mx-auto px-4 py-8 lg:px-6 xl:px-8">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl font-bold text-transparent dark:from-slate-100 dark:to-slate-400">
              Overview Administrativo
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Acompanhe o desempenho das vendas em tempo real
            </p>
          </div>

          <div className="hidden gap-4 md:flex">
            <div className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Total Vendas
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {totalVendas}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900">
                  <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Itens Vendidos
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {totalItens}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Média Mensal
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {mediaMensal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 md:hidden">
          <div className="rounded-lg bg-white p-3 text-center shadow dark:bg-slate-800">
            <DollarSign className="mx-auto h-5 w-5 text-blue-600 dark:text-blue-300" />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Vendas
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {totalVendas}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3 text-center shadow dark:bg-slate-800">
            <Package className="mx-auto h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Itens
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {totalItens}
            </p>
          </div>
          <div className="rounded-lg bg-white p-3 text-center shadow dark:bg-slate-800">
            <TrendingUp className="mx-auto h-5 w-5 text-amber-600 dark:text-amber-300" />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Média
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {mediaMensal}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Evolução de Vendas - {year}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quantidade de vendas por mês
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <ChartComponent
                  config={chartConfig}
                  dataKeyTitle={dataKeyTitle}
                  dataKeyContent={dataKeyContent}
                  tickLine={tickLine}
                  tickMargin={tickMargin}
                  axisLine={axisLine}
                  data={data}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-800">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    Selecionar Período
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Select
                      value={String(year)}
                      onValueChange={(value) => setYear(Number(value))}
                    >
                      <SelectTrigger className="w-full border-2 border-slate-200 bg-white py-6 text-base dark:border-slate-700 dark:bg-slate-900">
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {select.map((yearData: number) => (
                            <SelectItem key={yearData} value={String(yearData)}>
                              {yearData}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Filter className="h-4 w-4" />
                    <span>Dados atualizados em tempo real</span>
                  </div>
                </div>
              </div>

              {dataVendas?.meses && (
                <div className="hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800 lg:block">
                  <h3 className="mb-4 font-medium text-slate-900 dark:text-white">
                    Resumo do Ano
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Melhor mês:
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {monthTranslate(
                          dataVendas.meses.reduce((max, mes) =>
                            (mes.quantidade_vendas || 0) >
                            (max.quantidade_vendas || 0)
                              ? mes
                              : max,
                          ).mes_nome,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Total no ano:
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {totalVendas} vendas
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Média por mês:
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {mediaMensal} vendas
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
