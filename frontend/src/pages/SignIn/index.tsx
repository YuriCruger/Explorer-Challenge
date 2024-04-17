import { Button } from "@/components/Button";
import { FormGroup } from "@/components/FormGroup";
import { FormInput } from "@/components/FormInput";
import { Logo } from "@/components/Logo";
import { AuthPageTitle } from "@/components/AuthPageTitle";
import { useAuth } from "@/hooks/auth";
import { Label } from "@components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

type userSchemaProps = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { signIn, loading } = useAuth();

  const loginForm = useForm<userSchemaProps>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = loginForm;

  function onSubmit(values: userSchemaProps) {
    const email = values.email;
    const password = values.password;
    signIn({ email, password });
  }

  return (
    <div className="flex flex-col items-center h-screen gap-16 pt-[150px] w-80 mx-auto sm:w-[500px] lg:flex-row lg:w-full lg:p-28">
      <Logo />
      <FormProvider {...loginForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full lg:bg-dark-700 lg:p-16 lg:rounded-2xl"
        >
          <AuthPageTitle title="Faça login" />

          <FormGroup>
            <Label htmlFor="email" title="Email" />
            <FormInput
              name="email"
              autoFocus
              placeholder="Exemplo: exemplo@exemplo.com.br"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password" title="Senha" />
            <FormInput
              name="password"
              type="password"
              placeholder="No mínimo 6 caracteres"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </FormGroup>

          <Button
            disabled={loading}
            title={`${loading ? "Conectando" : "Entrar"}`}
            className={`${loading && "opacity-50"}`}
          />

          <Link to="/register">
            <p className="text-light-100 text-center hover:underline">
              Criar uma conta
            </p>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
}
