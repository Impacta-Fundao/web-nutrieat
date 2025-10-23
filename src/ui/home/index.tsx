import HomeView from "./view";
import useHomeModel from "./viewModel";

export default function HomePage() {
  const { chartConfig, chartData, dataKeyContent, dataKeyTitle } =
    useHomeModel();
  return (
    <HomeView
      chartConfig={chartConfig}
      data={chartData}
      axisLine
      dataKeyContent={dataKeyContent}
      dataKeyTitle={dataKeyTitle}
      tickLine
      tickMargin={10}
    />
  );
}
