import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthApiErrorResponse, RegisterFormData } from "@/models/admin/types/admin-auth-model";

export default function useRegisterFormModel() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      celular: "",
      senha: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setServerError(null);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as AuthApiErrorResponse;

      if (!response.ok) {
        throw new Error(payload.message || "Não foi possível criar a conta");
      }

      router.push("/Home");
      router.refresh();
    } catch (error) {
      const err = error as Error;
      setServerError(err.message);
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    serverError,
  };
}