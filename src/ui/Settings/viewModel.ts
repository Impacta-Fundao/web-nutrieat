import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  AdminAccountApiResponse,
  AdminAccountData,
  AdminAccountPatchPayload,
  AdminAccountUpdateFormData,
} from "@/models/admin/types/admin-account-model";

export default function useSettingsModel() {
  const [account, setAccount] = useState<AdminAccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AdminAccountUpdateFormData>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function fetchAccount() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/account", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const payload = (await response.json()) as AdminAccountApiResponse & {
        message?: string;
      };

      if (!response.ok || !payload?.data) {
        throw new Error(payload?.message || "Não foi possível carregar a conta.");
      }

      setAccount(payload.data);
      setValue("email", payload.data.email || "");
      setValue("senha", "");
    } catch (fetchError) {
      const err = fetchError as Error;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(formData: AdminAccountUpdateFormData) {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const body: AdminAccountPatchPayload = {};

      const normalizedEmail = formData.email?.trim()?.toLowerCase();
      const normalizedPassword = formData.senha?.trim();

      if (normalizedEmail && normalizedEmail !== account?.email) {
        body.email = normalizedEmail;
      }

      if (normalizedPassword) {
        body.senha = normalizedPassword;
      }

      if (!body.email && !body.senha) {
        setSuccessMessage("Nenhuma alteração para salvar.");
        return;
      }

      const response = await fetch(
        account?.id
          ? `/api/admin/account?id=${account.id}`
          : "/api/admin/account",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const payload = (await response.json()) as AdminAccountApiResponse & {
        message?: string;
      };

      if (!response.ok || !payload?.data) {
        throw new Error(payload?.message || "Não foi possível atualizar a conta.");
      }

      setAccount(payload.data);
      reset({
        email: payload.data.email || "",
        senha: "",
      });
      setSuccessMessage(payload.message || "Dados atualizados com sucesso.");
    } catch (submitError) {
      const err = submitError as Error;
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  return {
    account,
    loading,
    saving,
    error,
    successMessage,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
