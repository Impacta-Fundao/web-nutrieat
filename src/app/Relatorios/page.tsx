"use client";

import RelatoriosView from "@/ui/Relatorios/view";
import useRelatoriosModel from "@/ui/Relatorios/viewModel";

export default function RelatoriosPage() {
  const model = useRelatoriosModel();
  return <RelatoriosView {...model} />;
}