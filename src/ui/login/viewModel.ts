import { useForm } from 'react-hook-form';
import { FormsData } from './components/forms-props-model';
import { useState } from 'react';

export default function useRegisterFormsModel() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsData>();

  function onSubmit(data: FormsData) {
    try {
      setLoading(true);
      if (!data) {
        console.error('Error');
        setLoading(false);
        return;
      }
      console.log(data);
      return data;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Error: ${err.message} - ${err.cause}`);
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
  };
}
