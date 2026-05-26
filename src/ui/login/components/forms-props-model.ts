import {
  FieldPath,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface FieldConfig<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
}

export interface FormsModelProps<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  handleSubmit: UseFormHandleSubmit<TFormValues, TFormValues>;
  onSubmitHandler: (data: TFormValues) => Promise<void> | void;
  errors: FieldErrors<TFormValues>;
  isSubmitting: boolean;
  fields: FieldConfig<TFormValues>[];
  className?: string;
  title: string;
  description: string;
  submitLabel: string;
  footerLabel: string;
  footerHref: string;
  serverError: string | null;
}

export interface AuthViewProps<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  handleSubmit: UseFormHandleSubmit<TFormValues, TFormValues>;
  errors: FieldErrors<TFormValues>;
  onSubmit: (data: TFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  serverError: string | null;
}
