import { FormsModelProps } from "./forms-props-model";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const FormsComponent = ({
  errors,
  handleSubmit,
  onSubmitHandler,
  register,
  onSubmitLogin,
  className,
  childrenButtonBack,
  titleChildren,
  childrenButtonGo,
  isLogin,
  setIsLogin,
  errorsLogin,
  handleSubmitLogin,
  loading,
  registerLogin,
  status,
}: FormsModelProps) => {
  const route = useRouter();
  return (
    <Card className={clsx("mx-auto w-full max-w-2xl shadow-lg", className)}>
      <CardHeader className="bg-muted/50 py-4 rounded-md">
        <h2 className="text-center text-xl font-semibold text-foreground">
          {titleChildren}
        </h2>
      </CardHeader>
      <Separator />

      <form
        onSubmit={
          isLogin
            ? handleSubmitLogin(onSubmitLogin)
            : handleSubmit(onSubmitHandler)
        }
      >
        <CardContent className="space-y-6 p-6">
          {isLogin ? (
            <>
              <div className="w-full">
                <label className="text-sm font-medium text-foreground">
                  CPF *
                </label>
                <input
                  {...registerLogin("cpf", {
                    required: "Campo Obrigatório",
                  })}
                  placeholder="Digite o CPF"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errorsLogin.cpf && "border-destructive"
                  )}
                />
                {errorsLogin.cpf && (
                  <p className="text-sm text-destructive">
                    {errorsLogin.cpf.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Senha *
                </label>
                <input
                  {...registerLogin("senha", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="••••••••"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errorsLogin.senha && "border-destructive"
                  )}
                />

                {errorsLogin.senha && (
                  <span className="text-red-400">
                    {errorsLogin.senha.message}
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <label className="text-sm font-medium text-foreground">
                  CPF *
                </label>
                <input
                  {...register("cpf", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="Digite o cpf"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errors.cpf && "border-destructive"
                  )}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive">
                    {errors.cpf.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Senha *
                </label>
                <input
                  {...register("senha", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="Digite senha"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errors.senha && "border-destructive"
                  )}
                />
                {errors.senha && (
                  <p className="text-sm text-destructive">
                    {errors.senha.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Celular *
                </label>
                <input
                  {...register("celular", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="Digite o Celular"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errors.celular && "border-destructive"
                  )}
                />
                {errors.celular && (
                  <p className="text-sm text-destructive">
                    {errors.celular.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email *
                </label>
                <input
                  {...register("email", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="Digite o email"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errors.email && "border-destructive"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nome *
                </label>
                <input
                  {...register("nome", {
                    required: "Campo obrigatório",
                  })}
                  placeholder="Digite seu nome"
                  className={clsx(
                    "flex w-full items-center rounded-[6px] border py-2",
                    errors.nome && "border-destructive"
                  )}
                />
                {errors.nome && (
                  <p className="text-sm text-destructive">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="bg-muted/20 p-6">
          <Button
            variant={"secondary"}
            onClick={() => setIsLogin(!isLogin)}
            type="button"
            className="hover:bg-[#c7c7c7] py-3 font-medium text-slate-600  hover:text-black"
            size="lg"
          >
            {childrenButtonBack}
          </Button>
          {status && (
            <span className=" flex gap-3 ml-20 mx-auto p-3 bg-green-300 border-2 rounded-md border-green-600">
              <Check />
              {isLogin ? "Logado" : "Registrado"} com sucesso
            </span>
          )}
          <Button
            variant={"secondary"}
            type="submit"
            className="ml-auto py-3 font-medium text-black hover:bg-[#c7c7c7]"
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
