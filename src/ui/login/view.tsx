import FormsComponent from "./components/forms";
import FormsViewProps from "./components/forms-props-model";

export default function LoginView({
  errors,
  handleSubmit,
  loading,
  onSubmitCreate,
  register,
  isLogin,
  setIsLogin,
  errorsLogin,
  handleSubmitLogin,
  registerLogin,
  status,
  onSubmitLogin,
}: FormsViewProps) {
  return (
    <div className="flex h-screen items-center">
      <FormsComponent
        onSubmitLogin={onSubmitLogin}
        status={status}
        errorsLogin={errorsLogin}
        handleSubmitLogin={handleSubmitLogin}
        registerLogin={registerLogin}
        className="p-3"
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        errors={errors}
        loading={loading}
        onSubmitHandler={onSubmitCreate}
        register={register}
        handleSubmit={handleSubmit}
        titleChildren={isLogin ? "Faça o Login" : "Faça o Cadastro"}
        childrenButtonBack={isLogin ? "Cadastrar" : "Login"}
        childrenButtonGo={isLogin ? "Entrar" : "Cadastrar"}
      />
    </div>
  );
}
