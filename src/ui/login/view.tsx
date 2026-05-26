import { LoginFormData } from "@/models/admin/types/admin-auth-model";

import FormsComponent from "./components/forms";
import { AuthViewProps, FieldConfig } from "./components/forms-props-model";

const loginFields: FieldConfig<LoginFormData>[] = [
  {
    name: 'cpf',
    label: 'CPF',
    placeholder: 'Digite o CPF',
    type: 'text',
  },
  {
    name: 'senha',
    label: 'Senha',
    placeholder: 'Digite a senha',
    type: 'password',
  },
];

export default function LoginView({
  errors,
  handleSubmit,
  isSubmitting,
  onSubmit,
  register,
  serverError,
}: AuthViewProps<LoginFormData>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.24),_transparent_32%),linear-gradient(140deg,#04131b_0%,#0d2d36_45%,#eef7f3_45%,#f7faf9_100%)] px-4 py-10">
      <FormsComponent
        errors={errors}
        description="Acesse seu painel administrativo usando CPF e senha do administrador cadastrado."
        fields={loginFields}
        footerHref="/cadastro"
        footerLabel="Ainda não tem conta? Cadastrar"
        onSubmitHandler={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        serverError={serverError}
        submitLabel="Entrar"
        title="Entrar no painel"
      />
    </div>
  );
}
