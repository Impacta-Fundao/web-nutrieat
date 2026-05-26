"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductsData } from "@/pages/api/vendas/vendas-quantity-month";
import { VendaResponse } from "@/pages/api/vendas/vendas-year-month";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export type ComparisonData = {
  currentMonthName: string;
  previousMonthName: string;
  currentSales: number;
  previousSales: number;
  difference: number;
  percentageChange: number;
  trend: "up" | "down" | "stable";
};

export type MonthlySeriesItem = {
  mes_nome: string;
  quantidade_vendas: number;
};

export type TopProductItem = {
  nome_produto: string;
  total_vendido: number;
  mes_nome: string;
};

const MONTHS_EN = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function toMonthIndex(monthName: string): number {
  const normalized = monthName.trim().toLowerCase();
  return MONTHS_EN.indexOf(normalized) + 1;
}

function toMonthPt(monthName: string): string {
  const index = toMonthIndex(monthName);
  if (index < 1 || index > 12) return monthName;
  return MONTHS_PT[index - 1];
}

function resolveTrend(value: number): "up" | "down" | "stable" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "stable";
}

/** Formata número com separador de milhar pt-BR (ex: 1234 → 1.234) */
function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

/** Gera texto narrativo de comparação mensal */
function buildComparisonNarrative(data: ComparisonData): string {
  const { currentMonthName, previousMonthName, currentSales, previousSales, percentageChange, trend } = data;
  const pct = Math.abs(percentageChange).toFixed(1);

  if (trend === "stable") {
    return `Em ${currentMonthName}, as vendas se mantiveram estáveis em relação a ${previousMonthName}, registrando ${formatNumber(currentSales)} unidades vendidas — praticamente o mesmo volume do período anterior.`;
  }

  if (trend === "up") {
    const qualifier =
      percentageChange >= 30
        ? "expressivo avanço"
        : percentageChange >= 10
        ? "crescimento consistente"
        : "leve crescimento";
    return `${currentMonthName} apresentou um ${qualifier} de ${pct}% nas vendas, passando de ${formatNumber(previousSales)} unidades em ${previousMonthName} para ${formatNumber(currentSales)} neste mês.`;
  }

  const qualifier =
    Math.abs(percentageChange) >= 30
      ? "queda acentuada"
      : Math.abs(percentageChange) >= 10
      ? "recuo considerável"
      : "leve queda";
  return `${currentMonthName} registrou uma ${qualifier} de ${pct}% nas vendas em comparação com ${previousMonthName} (${formatNumber(previousSales)} → ${formatNumber(currentSales)} unidades).`;
}

/** Gera insights contextuais e humanos */
function buildInsights(
  comparison: ComparisonData,
  topProducts: TopProductItem[],
  monthlySeries: MonthlySeriesItem[]
): { symbol: string; text: string; color: [number, number, number] }[] {
  const insights: { symbol: string; text: string; color: [number, number, number] }[] = [];

  // Insight de tendência
  if (comparison.trend === "up") {
    insights.push({
      symbol: "#",
      text: `Alta de ${Math.abs(comparison.percentageChange).toFixed(1)}% em relação ao mês anterior — bom momento para reforçar o estoque dos itens mais vendidos.`,
      color: [22, 163, 74],
    });
  } else if (comparison.trend === "down") {
    insights.push({
      symbol: "#",
      text: `Retração de ${Math.abs(comparison.percentageChange).toFixed(1)}% nas vendas — vale revisar estratégias promocionais para o próximo período.`,
      color: [220, 38, 38],
    });
  } else {
    insights.push({
      symbol: "#",
      text: `Vendas estáveis em relação ao mês anterior — o ritmo está equilibrado, mas há espaço para crescimento.`,
      color: [100, 116, 139],
    });
  }

  // Insight do produto destaque
  if (topProducts.length > 0) {
    insights.push({
      symbol: "#",
      text: `Destaque do período: "${topProducts[0].nome_produto}" liderou com ${formatNumber(topProducts[0].total_vendido)} unidades vendidas.`,
      color: [37, 99, 235],
    });
  }

  // Insight de volume anual
  const totalAnual = monthlySeries.reduce((sum, m) => sum + m.quantidade_vendas, 0);
  const mediaAnual = totalAnual / (monthlySeries.filter((m) => m.quantidade_vendas > 0).length || 1);
  insights.push({
    symbol: "#",
    text: `Acumulado no ano: ${formatNumber(totalAnual)} unidades vendidas, com média mensal de ${formatNumber(Math.round(mediaAnual))}.`,
    color: [126, 34, 206],
  });

  // Insight do melhor mês do ano
  const bestMonth = [...monthlySeries].sort((a, b) => b.quantidade_vendas - a.quantidade_vendas)[0];
  if (bestMonth && bestMonth.quantidade_vendas > 0) {
    insights.push({
      symbol: "#",
      text: `Melhor mês do ano até agora: ${bestMonth.mes_nome}, com ${formatNumber(bestMonth.quantidade_vendas)} unidades.`,
      color: [234, 88, 12],
    });
  }

  return insights;
}

export default function useRelatoriosModel() {
  const now = new Date();
  const [year, setYear] = useState<number>(now.getFullYear());
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [salesData, setSalesData] = useState<VendaResponse | null>(null);
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const years = [2023, 2024, 2025, 2026];
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [salesResp, productsResp] = await Promise.all([
          fetch(`/api/vendas/vendas-year-month?year=${year}`),
          fetch(`/api/vendas/vendas-quantity-month?year=${year}`),
        ]);

        if (!salesResp.ok) throw new Error(`Erro ao buscar vendas: ${salesResp.status}`);
        if (!productsResp.ok) throw new Error(`Erro ao buscar produtos: ${productsResp.status}`);

        const [salesJson, productsJson]: [VendaResponse, ProductsData] = await Promise.all([
          salesResp.json(),
          productsResp.json(),
        ]);

        if (!isMounted) return;
        setSalesData(salesJson);
        setProductsData(productsJson);
      } catch (err) {
        if (!isMounted) return;
        setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [year]);

  const monthlySeries: MonthlySeriesItem[] = useMemo(() => {
    if (!salesData?.meses) return [];
    return [...salesData.meses]
      .sort((a, b) => Number(a.mes_numero) - Number(b.mes_numero))
      .map((item) => ({
        mes_nome: toMonthPt(item.mes_nome),
        quantidade_vendas: item.quantidade_vendas,
      }));
  }, [salesData]);

  const comparison: ComparisonData = useMemo(() => {
    const current =
      salesData?.meses.find((item) => Number(item.mes_numero) === month)?.quantidade_vendas ?? 0;
    const previousMonth = month === 1 ? 12 : month - 1;
    const previous =
      salesData?.meses.find((item) => Number(item.mes_numero) === previousMonth)?.quantidade_vendas ?? 0;
    const difference = current - previous;
    const percentageChange =
      previous === 0 ? (current > 0 ? 100 : 0) : (difference / previous) * 100;

    return {
      currentMonthName: MONTHS_PT[month - 1],
      previousMonthName: MONTHS_PT[previousMonth - 1],
      currentSales: current,
      previousSales: previous,
      difference,
      percentageChange,
      trend: resolveTrend(difference),
    };
  }, [month, salesData]);

  const topProducts: TopProductItem[] = useMemo(() => {
    if (!productsData?.meses) return [];
    return productsData.meses
      .map((item) => ({
        nome_produto: item.nome_produto,
        total_vendido: item.total_vendido,
        mes_nome: toMonthPt(item.mes_nome),
      }))
      .sort((a, b) => b.total_vendido - a.total_vendido)
      .slice(0, 5);
  }, [productsData]);

  async function exportToPdf() {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let currentY = 0;

    // ── Cabeçalho ──────────────────────────────────────────────────────────
    pdf.setFillColor(15, 118, 110);
    pdf.rect(0, 0, pageWidth, 42, "F");

    // Faixa decorativa inferior do header
    pdf.setFillColor(13, 100, 93);
    pdf.rect(0, 36, pageWidth, 6, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Nutrieat", 20, 18);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(178, 224, 218);
    pdf.text("Relatório Gerencial de Vendas", 20, 27);

    // Data de geração — formato humano
    const dataGeracao = new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const horaGeracao = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    pdf.setFontSize(8);
    pdf.setTextColor(140, 200, 194);
    pdf.text(`Gerado em ${dataGeracao}, às ${horaGeracao}`, pageWidth - 20, 20, { align: "right" });

    currentY = 52;

    // ── Linha de contexto ───────────────────────────────────────────────────
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    pdf.text(
      `Este relatório apresenta o desempenho de vendas referente ao mês de ${comparison.currentMonthName} de ${year}.`,
      20,
      currentY
    );
    currentY += 10;

    // ── KPI Cards ──────────────────────────────────────────────────────────
    const cardW = (pageWidth - 50) / 3;
    const cardH = 32;

    const cards = [
      {
        title: "Vendas em " + comparison.currentMonthName,
        value: formatNumber(comparison.currentSales) + " un.",
        subtitle: "mês atual",
        bg: [30, 144, 255] as [number, number, number],
        sub: [180, 215, 255] as [number, number, number],
      },
      {
        title: "Vendas em " + comparison.previousMonthName,
        value: formatNumber(comparison.previousSales) + " un.",
        subtitle: "mês anterior",
        bg: [245, 130, 32] as [number, number, number],
        sub: [255, 210, 160] as [number, number, number],
      },
      {
        title: "Variação no período",
        value:
          (comparison.trend === "up" ? "+" : "") +
          formatNumber(comparison.difference) +
          " un.",
        subtitle: `${comparison.percentageChange >= 0 ? "+" : ""}${comparison.percentageChange.toFixed(1)}% vs. mês anterior`,
        bg:
          comparison.trend === "up"
            ? ([22, 163, 74] as [number, number, number])
            : comparison.trend === "down"
            ? ([220, 38, 38] as [number, number, number])
            : ([100, 116, 139] as [number, number, number]),
        sub: [220, 255, 230] as [number, number, number],
      },
    ];

    cards.forEach((card, i) => {
      const x = 20 + i * (cardW + 5);
      pdf.setFillColor(...card.bg);
      pdf.roundedRect(x, currentY, cardW, cardH, 3, 3, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(255, 255, 255);
      pdf.text(card.title.toUpperCase(), x + 5, currentY + 8);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(15);
      pdf.text(card.value, x + 5, currentY + 20);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(...card.sub);
      pdf.text(card.subtitle, x + 5, currentY + 28);
    });

    currentY += cardH + 14;

    // ── Narrativa comparativa ───────────────────────────────────────────────
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(20, currentY - 4, pageWidth - 20, currentY - 4);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(15, 118, 110);
    pdf.text("Análise do período", 20, currentY + 4);

    currentY += 11;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(55, 65, 81);
    const narrative = buildComparisonNarrative(comparison);
    const narrativeLines = pdf.splitTextToSize(narrative, pageWidth - 40);
    pdf.text(narrativeLines, 20, currentY);
    currentY += narrativeLines.length * 5 + 8;

    // ── Tabela: Evolução Mensal ─────────────────────────────────────────────
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(15, 118, 110);
    pdf.text("Evolução de vendas ao longo do ano", 20, currentY);
    currentY += 5;

    autoTable(pdf, {
      head: [["Mês", "Unidades vendidas"]],
      body: monthlySeries.map((item) => [
        item.mes_nome,
        formatNumber(item.quantidade_vendas),
      ]),
      startY: currentY,
      margin: { left: 20, right: 20 },
      headStyles: {
        fillColor: [15, 118, 110],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
        cellPadding: 5,
      },
      bodyStyles: {
        fontSize: 8.5,
        cellPadding: 4,
        textColor: [55, 65, 81],
      },
      alternateRowStyles: { fillColor: [241, 250, 249] },
      columnStyles: {
        0: { cellWidth: 80, halign: "left" },
        1: { cellWidth: 70, halign: "right" },
      },
    });

    currentY = (pdf as any).lastAutoTable.finalY + 10;

    // ── Nova página se necessário ──────────────────────────────────────────
    if (currentY > pageHeight - 70) {
      pdf.addPage();
      currentY = 20;
    }

    // ── Tabela: Top Produtos ───────────────────────────────────────────────
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(15, 118, 110);
    pdf.text("Produtos mais vendidos no ano", 20, currentY);
    currentY += 5;

    autoTable(pdf, {
      head: [["Produto", "Mês de referência", "Unidades vendidas"]],
      body:
        topProducts.length > 0
          ? topProducts.map((item, idx) => [
              `${idx + 1}. ${item.nome_produto}`,
              item.mes_nome,
              formatNumber(item.total_vendido),
            ])
          : [["Nenhum produto encontrado para o período.", "—", "—"]],
      startY: currentY,
      margin: { left: 20, right: 20 },
      headStyles: {
        fillColor: [15, 118, 110],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
        cellPadding: 5,
      },
      bodyStyles: {
        fontSize: 8.5,
        cellPadding: 4,
        textColor: [55, 65, 81],
      },
      alternateRowStyles: { fillColor: [241, 250, 249] },
      columnStyles: {
        0: { halign: "left" },
        1: { cellWidth: 40, halign: "center" },
        2: { cellWidth: 45, halign: "right" },
      },
    });

    currentY = (pdf as any).lastAutoTable.finalY + 12;

    // ── Nova página se necessário ──────────────────────────────────────────
    if (currentY > pageHeight - 80) {
      pdf.addPage();
      currentY = 20;
    }

    // ── Insights & Recomendações ───────────────────────────────────────────
    pdf.setDrawColor(226, 232, 240);
    pdf.line(20, currentY - 4, pageWidth - 20, currentY - 4);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(15, 118, 110);
    pdf.text("Observações e recomendações", 20, currentY + 4);
    currentY += 13;

    const insights = buildInsights(comparison, topProducts, monthlySeries);

    insights.forEach((insight) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...insight.color);
      pdf.text(insight.symbol, 22, currentY);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(55, 65, 81);
      const lines = pdf.splitTextToSize(insight.text, pageWidth - 52);
      pdf.text(lines, 30, currentY);
      currentY += lines.length * 5.5 + 3;
    });

    // ── Rodapé ─────────────────────────────────────────────────────────────
    const footerY = pageHeight - 10;
    pdf.setDrawColor(226, 232, 240);
    pdf.line(20, footerY - 6, pageWidth - 20, footerY - 6);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(156, 163, 175);
    pdf.text("Nutrieat — Relatório Gerencial de Vendas. Documento gerado automaticamente.", 20, footerY - 1);

    const pageCount = (pdf.internal as any).pages.length - 1;
    pdf.text(`Pág. ${pageCount}`, pageWidth - 20, footerY - 1, { align: "right" });

    const monthLabel = MONTHS_PT[month - 1]?.toLowerCase().replace(/ç/g, "c").replace(/ã/g, "a").replace(/ê/g, "e") ?? "mes";
    pdf.save(`relatorio-nutrieat-${year}-${monthLabel}.pdf`);
  }

  return {
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
  };
}