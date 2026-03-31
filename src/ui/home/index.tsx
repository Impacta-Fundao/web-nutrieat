"use client";
import HomeView from "./view";
import useHomeModel from "./viewModel";

export default function HomePage() {
  const {
    chartConfig,
    chartData,
    dataKeyContent,
    dataKeyTitle,
    dataVendas,
    select,
    setYear,
    year,
    loading,
  } = useHomeModel();
  return (
    <HomeView
      loading={loading}
      setYear={setYear}
      year={year}
      select={select}
      dataVendas={dataVendas}
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
