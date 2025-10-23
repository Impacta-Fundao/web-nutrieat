import { ChartConfig } from "@/components/ui/chart";
import { ChartComponent } from "./components/chart";
import { data } from "./viewModel";



export interface HomeViewProps {
  chartConfig: ChartConfig;
  dataKeyTitle: string;
  dataKeyContent: string;
  tickLine: boolean;
  tickMargin: number;
  axisLine: boolean;
  data: data[];
}

export default function HomeView({
  axisLine,
  chartConfig,
  data,
  dataKeyContent,
  dataKeyTitle,
  tickLine,
  tickMargin,
}: HomeViewProps) {


  return (
    <main className="ml-5 h-screen">
      <h1 className="px-5 pt-5 text-3xl">Overview para o Administrador</h1>
      <div className="w-4xl">
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
    </main>
  );
}
