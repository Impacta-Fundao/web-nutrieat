"use client";

import RelatoriosView from "./view";
import useRelatoriosModel from "./viewModel";

export default function RelatoriosPage() {
  const {
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
  } = useRelatoriosModel();

  return (
    <RelatoriosView
      year={year}
      setYear={setYear}
      month={month}
      setMonth={setMonth}
      years={years}
      loading={loading}
      error={error}
      comparison={comparison}
      monthlySeries={monthlySeries}
      topProducts={topProducts}
      exportToPdf={exportToPdf}
      reportRef={reportRef}
    />
  );
}
