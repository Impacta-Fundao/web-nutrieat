export interface AdminSession {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
}

export interface LoginFormData {
  cpf: string;
  senha: string;
}

export interface RegisterFormData extends LoginFormData {
  nome: string;
  email: string;
  celular: string;
}

export interface AuthPayload {
  admin: AdminSession;
  access_token: string;
  refresh_token: string;
  token_type: string;
  access_token_expires_in: number;
  refresh_token_expires_in: number;
}

export interface AuthApiSuccessResponse {
  message: string;
  data: AuthPayload;
}

export interface AuthApiErrorResponse {
  message: string;
}