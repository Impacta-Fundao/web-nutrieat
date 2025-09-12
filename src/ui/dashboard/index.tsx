"use client";
import ProdutosView from "./view";
import useProdutosModel from "./viewModel";

export default function Produtos() {
  const {
    data,
    loading,
    produto,
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    error,
  } = useProdutosModel();
  return (
    <ProdutosView
      data={data}
      error={error}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      produto={produto}
      register={register}
      reset={reset}
      loading={loading}
    />
  );
}
