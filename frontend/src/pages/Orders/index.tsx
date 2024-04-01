import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { OrderItem } from "./components/OrderItem";
import { Button } from "@/components/Button";
import { useOrders } from "@/providers/orders";
import { useDish } from "@/providers/dishes";
import { formatPrice } from "@/utils/formatPrice";
import { Dish } from "@/types/dish";

export default function Orders() {
  const { orders, deleteOrder } = useOrders();
  const { dishList } = useDish();

  const dishesInCart = dishList?.filter((dish) =>
    orders.some((order) => order.id === dish.id)
  );

  const getQuantity = (dish: Dish) => {
    const order = orders.find((order) => order.id === dish.id);
    return order ? order.quantity : 1;
  };

  const dishesTotalPrice = dishesInCart?.reduce(
    (total, dish) => total + dish.price * getQuantity(dish),
    0
  );

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      {dishesInCart && dishesInCart.length > 0 ? (
        <>
          <PageTitle title="Carrinho de compras" />

          <div className="divide-light-500 divide-y-2 text-light-100 bg-dark-600 p-5 rounded-lg">
            {dishesInCart &&
              dishesInCart.map((dish) => (
                <OrderItem
                  key={dish.id}
                  dish={dish}
                  quantity={getQuantity(dish)}
                  deleteOrder={deleteOrder}
                />
              ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between">
            <p className="text-3xl font-bold text-light-100">
              Total: {formatPrice(Number(dishesTotalPrice))}
            </p>
            <Button title="Finalizar compra" className="lg:w-[172px]" />
          </div>
        </>
      ) : (
        <p className="text-light-100 text-2xl text-center mt-[300px]">
          Seu carrinho de compras está vazio.
        </p>
      )}
    </div>
  );
}
