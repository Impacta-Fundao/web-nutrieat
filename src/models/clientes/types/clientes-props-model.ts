import { ColumnDef } from "@tanstack/react-table";

export interface ClienteModelData {
  id: number;
  cpf: string;
  idade: number;
  nome: string;
  numrero: string;
  sala: string;
  turno: string;
  email: string;
}

export interface ClienteFormsData {
  nome: string;
  cpf: string;
  data_nascimento: string;
}

export interface ApiResponseData {
  data: ClienteFormsData[];
}

export interface ClientesViewProps {
  user: ClienteModelData[];
  error: string | null | undefined;
  fetchData: () => Promise<void>;
  columns: ColumnDef<ClienteModelData>[];
  loading: boolean;
   deleteClient: (id: string) => Promise<any>
}
