import { Button } from "@/components/Button";
import { useOrders } from "@/hooks/cartOrders";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PaymentSuccess() {
  const { clearOrdersFromCart } = useOrders();

  useEffect(() => {
    clearOrdersFromCart();
  }, []);

  return (
    <div className="text-light-100 flex items-center justify-center flex-col gap-5 mt-[200px] text-center">
      <h1 className="text-5xl font-bold">Pagamento efetuado com sucesso!</h1>
      <p className="text-3xl">
        Agora é só aguardar, seu pedido está sendo preparado.
      </p>
      <Link to="/">
        <Button title="Continuar comprando" className="w-fit px-10" />
      </Link>
    </div>
  );
}