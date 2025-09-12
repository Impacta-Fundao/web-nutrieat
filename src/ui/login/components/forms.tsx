import { Input } from '@/components/ui/input';
import { FormsModelProps } from './forms-props-model';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const FormsComponent = ({
  errors,
  handleSubmit,
  onSubmitHandler,
  register,
  className,
  childrenButtonBack,
  titleChildren,
  childrenButtonGo,
}: FormsModelProps) => {
  const route = useRouter();
  return (
    <Card className={clsx('mx-auto w-full max-w-2xl shadow-lg', className)}>
      <CardHeader className="bg-muted/50 py-4">
        <h2 className="text-center text-xl font-semibold text-foreground">
          {titleChildren}
        </h2>
      </CardHeader>
      <Separator />

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardContent className="space-y-6 p-6">
          <div className="w-full">
            <label className="text-sm font-medium text-foreground">
              Grupo ou Usuário *
            </label>
            <input
              {...register('groupOrUser', {
                required: 'Campo obrigatório',
              })}
              placeholder="Digite o grupo ou usuário"
              className={clsx(
                'flex w-full items-center rounded-[6px] border py-2',
                errors.groupOrUser && 'border-destructive',
              )}
            />
            {errors.groupOrUser && (
              <p className="text-sm text-destructive">
                {errors.groupOrUser.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              ID do Relatório *
            </label>
            <input
              {...register('reportId', {
                required: 'Campo obrigatório',
              })}
              placeholder="Digite o ID do relatório"
              className={clsx(
                'flex w-full items-center rounded-[6px] border py-2',
                errors.reportId && 'border-destructive',
              )}
            />
            {errors.reportId && (
              <p className="text-sm text-destructive">
                {errors.reportId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              ID da Página *
            </label>
            <input
              {...register('pageId', {
                required: 'Campo obrigatório',
              })}
              placeholder="Digite o ID da página"
              className={clsx(
                'flex w-full items-center rounded-[6px] border py-2',
                errors.pageId && 'border-destructive',
              )}
            />
            {errors.pageId && (
              <p className="text-sm text-destructive">
                {errors.pageId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Nome *
            </label>
            <input
              {...register('name', {
                required: 'Campo obrigatório',
              })}
              placeholder="Digite o nome"
              className={clsx(
                'flex w-full items-center rounded-[6px] border py-2',
                errors.name && 'border-destructive',
              )}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="bg-muted/20 p-6">
          <Button
            variant={'secondary'}
            onClick={() => route.back()}
            type="button"
            className="hover: bg-[#47556927] py-3 font-medium text-slate-600 hover:bg-[#47556927]/90 hover:text-white"
            size="lg"
          >
            {childrenButtonBack}
          </Button>
          <Button
            variant={'secondary'}
            type="submit"
            className="ml-auto py-3 font-medium text-white hover:bg-[#00DBE1]/90"
            size="lg"
          >
            {childrenButtonGo}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FormsComponent;
