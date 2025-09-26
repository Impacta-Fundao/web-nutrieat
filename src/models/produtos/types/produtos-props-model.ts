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
  preco: number;
}

export interface ProdutoViewProps {
  data: ProdutosModelData[];
  loading: boolean;
  produto: ProdutosModelData | null | undefined;
  registerCreate: UseFormRegister<ProdutoFormData>;
  handleSubmitCreate: UseFormHandleSubmit<ProdutoFormData, ProdutoFormData>;
  onSubmitCreate: SubmitHandler<ProdutoFormData>;
  errosCreate: FieldErrors<ProdutoFormData>;
  resetCreate: UseFormReset<ProdutoFormData>;
  registerEdit: UseFormRegister<ProdutoFormData>;
  handleSubmitEdit: UseFormHandleSubmit<ProdutoFormData, ProdutoFormData>;
  onSubmitEdit: SubmitHandler<ProdutoFormData>;
  errosEdit: FieldErrors<ProdutoFormData>;
  resetEdit: UseFormReset<ProdutoFormData>;
  error: string | null;
  produtoEditando: ProdutosModelData | null;
  iniciarEdicao: (produto: ProdutosModelData) => void;
  deleteProduto: (id: string) => Promise<any>;
  status: boolean;
}
