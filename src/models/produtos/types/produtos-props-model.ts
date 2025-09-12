import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

export interface ProdutosModelData {
  id: number;
  nome: string;
  preço: string;
}

export interface ApiResponse {
  data: { data: ProdutosModelData[] };
}

export interface ApiResponseId {
  data: ProdutosModelData;
}

export interface ProdutoFormData {
  nome: string;
  preco: string;
}

export interface ProdutoViewProps {
  data: ProdutosModelData[];
  loading: boolean;
  produto: ProdutosModelData | null | undefined;
  register: UseFormRegister<ProdutoFormData>;
  handleSubmit: UseFormHandleSubmit<ProdutoFormData, ProdutoFormData>;
  onSubmit: SubmitHandler<ProdutoFormData>;
  errors: FieldErrors<ProdutoFormData>;
  reset: UseFormReset<ProdutoFormData>;
  error: string | null;
}
