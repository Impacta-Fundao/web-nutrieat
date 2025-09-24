"use client";
import ProdutosView from "./view";
import useProdutosModel from "./viewModel";

export default function Produtos() {
  const {
    data,
    loading,
    produto,
    errosCreate,
    errosEdit,
    handleSubmitCreate,
    handleSubmitEdit,
    onSubmitCreate,
    onSubmitEdit,
    registerCreate,
    registerEdit,
    resetCreate,
    resetEdit,
    error,
    iniciarEdicao,
    produtoEditando,
    status,
  } = useProdutosModel();
  return (
    <ProdutosView
      status={status}
      iniciarEdicao={iniciarEdicao}
      produtoEditando={produtoEditando}
      data={data}
      error={error}
      errosCreate={errosCreate}
      handleSubmitCreate={handleSubmitCreate}
      onSubmitCreate={onSubmitCreate}
      produto={produto}
      registerCreate={registerCreate}
      resetCreate={resetCreate}
      loading={loading}
      errosEdit={errosEdit}
      handleSubmitEdit={handleSubmitEdit}
      onSubmitEdit={onSubmitEdit}
      registerEdit={registerEdit}
      resetEdit={resetEdit}
    />
  );
}
