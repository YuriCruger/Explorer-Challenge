import { Button } from "@/components/Button";
import { FormGroup } from "@/components/FormGroup";
import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { Title } from "@/components/AuthPageTitle";
import { useAuth } from "@/hooks/auth";
import { Label } from "@components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

type userSchemaProps = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userSchemaProps>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: userSchemaProps) {
    const email = values.email;
    const password = values.password;
    signIn({ email, password });
  }

  return (
    <div className="flex flex-col items-center h-screen gap-16 pt-[150px] w-80 mx-auto sm:w-[500px] lg:flex-row lg:w-full lg:p-28">
      <Logo />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full lg:bg-dark-700 lg:p-16 lg:rounded-2xl"
      >
        <Title title="Faça login" />

        <FormGroup>
          <Label htmlFor="email" title="Email" />
          <Input
            id="email"
            autoFocus
            placeholder="Exemplo: exemplo@exemplo.com.br"
            register={register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" title="Senha" />
          <Input
            id="password"
            type="password"
            placeholder="No mínimo 6 caracteres"
            register={register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </FormGroup>

        <Button title="Entrar" />

        <Link to="/register">
          <p className="text-light-100 text-center hover:underline">
            Criar uma conta
          </p>
        </Link>
      </form>
    </div>
  );
}
