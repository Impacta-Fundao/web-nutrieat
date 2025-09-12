import FormsComponent from "./components/forms";
import FormsViewProps from "./components/forms-props-model";

export default function LoginView({
  errors,
  handleSubmit,
  loading,
  onSubmit,
  register,
}: FormsViewProps) {
  return (
    <div className="flex h-screen items-center ">
      <FormsComponent
        errors={errors}
        loading={loading}
        onSubmitHandler={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        titleChildren="Faça o Login"
        childrenButtonBack="Cadastrar"
        childrenButtonGo="Entrar"
      />
    </div>
  );
}
