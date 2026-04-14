"use client";
import HomeView from "./view";
import useHomeModel from "./viewModel";

export default function HomePage() {
  const {
    chartConfigVendas,
    chartConfigProducts,
    chartDataProducts,
    chartDataPurchases,
    dataKeyContentVendas,
    dataKeyTitleVendas,
    dataVendas,
    select,
    setYearProduct,
    setYearVenda,
    yearProduct,
    yearVenda,
    loading,
    dataContentProsucts,
    dataTitleProducts,
    productVendas,
  } = useHomeModel();
  return (
    <HomeView
      loading={loading}
      setYearVenda={setYearVenda}
      yearVenda={yearVenda}
      yearProduct={yearProduct}
      setYearProduct={setYearProduct}
      select={select}
      dataVendas={dataVendas}
      chartConfigVendas={chartConfigVendas}
      chartConfigProducts={chartConfigProducts}
      axisLine
      dataKeyContentPurchases={dataKeyContentVendas}
      dataKeyTitlePurchases={dataKeyTitleVendas}
      tickLine
      tickMargin={10}
      dataKeyContentProducts={dataContentProsucts}
      dataKeyTitleProducts={dataTitleProducts}
      productVendas={productVendas}
      dataChartVendas={chartDataPurchases}
      dataChartProducts={chartDataProducts}
    />
  );
}
