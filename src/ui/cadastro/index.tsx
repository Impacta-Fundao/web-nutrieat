"use client";

import RegisterView from "./view";
import useRegisterFormModel from "./viewModel";

export default function CadastroPage() {
  const { errors, handleSubmit, isSubmitting, onSubmit, register, serverError } =
    useRegisterFormModel();

  return (
    <RegisterView
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      register={register}
      serverError={serverError}
    />
  );
}