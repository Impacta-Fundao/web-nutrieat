import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface AdminAccountData {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
}

export interface AdminAccountApiResponse {
  data: AdminAccountData;
  message?: string;
}

export interface AdminAccountUpdateFormData {
  email: string;
  senha: string;
}

export interface AdminAccountPatchPayload {
  email?: string;
  senha?: string;
}

export interface SettingsViewProps {
  account: AdminAccountData | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  successMessage: string | null;
  register: UseFormRegister<AdminAccountUpdateFormData>;
  handleSubmit: UseFormHandleSubmit<AdminAccountUpdateFormData, AdminAccountUpdateFormData>;
  errors: FieldErrors<AdminAccountUpdateFormData>;
  onSubmit: SubmitHandler<AdminAccountUpdateFormData>;
}
