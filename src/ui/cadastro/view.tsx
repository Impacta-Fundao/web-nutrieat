import {
  RegisterFormData,
} from "@/models/admin/types/admin-auth-model";

import FormsComponent from "@/ui/login/components/forms";
import {
  AuthViewProps,
  FieldConfig,
} from "@/ui/login/components/forms-props-model";

const registerFields: FieldConfig<RegisterFormData>[] = [
  {
    name: "nome" as const,
    label: "Nome completo",
    placeholder: "Digite o nome do administrador",
    type: "text",
  },
  {
    name: "cpf" as const,
    label: "CPF",
    placeholder: "Digite o CPF",
    type: "text",
  },
  {
    name: "email" as const,
    label: "Email",
    placeholder: "Digite o email",
    type: "email",
  },
  {
    name: "celular" as const,
    label: "Celular",
    placeholder: "Digite o celular",
    type: "text",
  },
  {
    name: "senha" as const,
    label: "Senha",
    placeholder: "Crie uma senha",
    type: "password",
  },
];

export default function RegisterView({
  errors,
  handleSubmit,
  isSubmitting,
  onSubmit,
  register,
  serverError,
}: AuthViewProps<RegisterFormData>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.18),_transparent_35%),linear-gradient(135deg,#07111f_0%,#0c2530_45%,#f3f7f6_45%,#eef6f0_100%)] px-4 py-10">
      <FormsComponent
        description="Cadastre o administrador principal para acessar o painel do Nutrieat."
        errors={errors}
        fields={registerFields}
        footerHref="/login"
        footerLabel="Já tem conta? Entrar"
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSubmitHandler={onSubmit}
        register={register}
        serverError={serverError}
        submitLabel="Criar conta"
        title="Criar acesso administrativo"
      />
    </div>
  );
}