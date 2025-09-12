"use client";
import useProdutosModel from "./viewModel";
import { ProdutoViewProps } from "./viewModel";

export default function ProdutosView({data,error,errors,handleSubmit,loading,onSubmit,produto,register,reset}: ProdutoViewProps) {
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
