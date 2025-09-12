export interface ProdutosModel {
    id: number 
    nome: string | null
    preco: number | null
}

export interface ApiResponse {
  data: ProdutosModel[];
}

export interface ApiResponseId{
    data: ProdutosModel;
}

export interface AdministrationViewProps {
  data: ProdutosModel[];
  loading: boolean;
}

export interface ProdutoData {
  nome: string
  preco: number | string
}