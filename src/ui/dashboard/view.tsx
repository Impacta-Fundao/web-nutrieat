"use client";
import useProdutosModel from "./viewModel";

export interface ProdutoViewProps {}

export default function ProdutosView() {
  const { data, loading, } = useProdutosModel();
  return (
    <div>
      <ul className="w-72 bg-[red]">
        {data.length !== 0 ? (
          data.map((value) => <li key={value.id}>{value.nome}</li>)
        ) : (
          <h1>CARALHOOO</h1>
        )}
      </ul>
      <div>Hello World</div>
    </div>
  );
}
