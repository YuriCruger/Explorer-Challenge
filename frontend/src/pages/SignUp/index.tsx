import { Button } from "@/components/Button";
import { FormGroup } from "@/components/FormGroup";
import { FormInput } from "@/components/FormInput";
import { Logo } from "@/components/Logo";
import { AuthPageTitle } from "@/components/AuthPageTitle";
import { api } from "@/services/api";
import { Label } from "@components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const registerSchema = z.object({
  name: z.string().min(1, "Você precisa inserir seu nome"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

type userSchemaProps = z.infer<typeof registerSchema>;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createUserForm = useForm<userSchemaProps>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = createUserForm;

  async function onSubmit(values: userSchemaProps) {
    setLoading(true);
    await api
      .post("/users", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        toast("Cadastro realizado com sucesso!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("Não foi possível cadastrar.");
        }
      });
  }

  return (
    <div className="flex flex-col items-center h-screen gap-16 pt-[150px] w-80 mx-auto sm:w-[500px] lg:flex-row lg:w-full lg:p-28">
      <Logo />

      <FormProvider {...createUserForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-8 lg:bg-dark-700 lg:p-16 lg:rounded-2xl"
        >
          <AuthPageTitle title="Crie sua conta" />

          <FormGroup>
            <Label htmlFor="name" title="Seu nome" />
            <FormInput
              name="name"
              autoFocus
              placeholder="Exemplo: Maria da Silva"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" title="Email" />
            <FormInput
              name="email"
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
            title={`${loading ? "Criando" : "Criar uma conta"}`}
            disabled={loading}
            className={`${loading && "opacity-50"}`}
          />

          <Link to="/">
            <p className="text-light-100 text-center hover:underline">
              Já tenho uma conta
            </p>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
}
