"use client";
import LoginView from "./view";
import useRegisterFormsModel from "./viewModel";

export default function LoginPage() {
  const {
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
  } = useRegisterFormsModel();
  return (
    <LoginView
    onSubmitLogin={onSubmitLogin}
    status={status}
      errorsLogin={errorsLogin}
      handleSubmitLogin={handleSubmitLogin}
      registerLogin={registerLogin}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      errors={errors}
      handleSubmit={handleSubmit}
      loading={loading}
      onSubmitCreate={onSubmitCreate}
      register={register}
    />
  );
}
