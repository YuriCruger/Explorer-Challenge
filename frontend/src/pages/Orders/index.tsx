import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { OrderItem } from "./components/OrderItem";
import { Button } from "@/components/Button";

export default function Orders() {
  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Carrinho de compras" />

      <div className="divide-light-500 divide-y-2 text-light-100 bg-dark-600 p-5 rounded-lg">
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>

      <div className="mt-5 flex justify-between">
        <p className="text-3xl font-bold text-light-100">Preço Total: R$100</p>
        <Button title="Finalizar compra" className="lg:w-[172px]" />
      </div>
    </div>
  );
}
