import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  AuthApiErrorResponse,
  LoginFormData,
} from '@/models/admin/types/admin-auth-model';

export default function useLoginFormModel() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      cpf: '',
      senha: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setServerError(null);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as AuthApiErrorResponse;

      if (!response.ok) {
        throw new Error(payload.message || 'Não foi possível realizar o login');
      }

      router.push('/Home');
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
