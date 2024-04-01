import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

export function NotFound() {
  return (
    <div className="text-light-100 flex items-center justify-center flex-col gap-5 mt-[200px] text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-5xl">Página não encontrada</p>
      <Link to="/">
        <Button title="Voltar para o Ínicio" className="w-fit px-10" />
      </Link>
    </div>
  );
}
