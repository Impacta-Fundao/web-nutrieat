import { ChartConfig } from "@/components/ui/chart";
import { ChartComponent } from "./components/chart";


export default function HomeView() {

    const chartConfig = {
  lanches: {
    label: "Lanches",
    color: "#2563eb",
  },
} satisfies ChartConfig;

  return (
    <main className="ml-5 h-screen">
      <h1 className="px-5 pt-5 text-3xl">Overview para o Administrador</h1>
      <div className="w-4xl">
        <ChartComponent config={chartConfig} />
      </div>
    </main>
  );
}
