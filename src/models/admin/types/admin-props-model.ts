export interface FormsRegisterAdmin {
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  senha: string;
}

export interface FormsDataLogin {
  cpf: string;
  senha: string;
}

export interface FormsRegisterRaw {
  data: FormsRegisterAdmin | null;
  message: string;
}

export interface AdmById {
  celular: string;
  cpf: string;
  email: string;
  id: number;
  nome: string;
}
