import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { FormsModelProps } from './forms-props-model';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { FieldValues } from 'react-hook-form';

const FormsComponent = <TFormValues extends FieldValues>({
  errors,
  handleSubmit,
  onSubmitHandler,
  register,
  className,
  description,
  fields,
  footerHref,
  footerLabel,
  isSubmitting,
  serverError,
  submitLabel,
  title,
}: FormsModelProps<TFormValues>) => {
  return (
    <Card
      className={clsx(
        'mx-auto w-full max-w-xl overflow-hidden border-0 bg-white/92 shadow-[0_24px_80px_rgba(7,17,31,0.22)] backdrop-blur',
        className,
      )}
    >
      <CardHeader className="space-y-3 bg-slate-950 px-8 py-8 text-white">
        <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-200">
          Nutrieat
        </span>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            {description}
          </p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardContent className="space-y-5 px-8 py-8">
          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          {fields.map((field) => {
            const fieldError = errors[field.name];

            return (
              <div className="space-y-2" key={field.name}>
                <label className="text-sm font-medium text-slate-700">
                  {field.label}
                </label>
                <Input
                  {...register(field.name, {
                    required: 'Campo obrigatório',
                  })}
                  placeholder={field.placeholder}
                  type={field.type ?? 'text'}
                  className={clsx(
                    'h-12 rounded-xl border-slate-200 bg-white text-black',
                    fieldError && 'border-red-400 focus-visible:ring-red-400',
                  )}
                />
                {fieldError?.message && (
                  <p className="text-sm text-red-600">
                    {String(fieldError.message)}
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-4 bg-slate-50 px-8 py-6">
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            href={footerHref}
          >
            {footerLabel}
          </Link>
          <Button
            className="min-w-36 rounded-xl bg-teal-500 py-3 font-medium text-slate-950 hover:bg-teal-400"
            disabled={isSubmitting}
            type="submit"
            size="lg"
          >
            {isSubmitting ? 'Processando...' : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FormsComponent;
