import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { OrderItem } from "./components/OrderItem";
import { Button } from "@/components/Button";
import { useOrders } from "@/hooks/cartOrders";
import { useDish } from "@/hooks/dishes";
import { formatPrice } from "@/utils/formatPrice";
import { Dish } from "@/types/dish";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/auth";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

export default function Orders() {
  const { cartOrders, deleteOrderFromCart } = useOrders();
  const { dishList } = useDish();
  const { user } = useAuth();

  const dishesInCart = dishList?.filter((dish) =>
    cartOrders.some((order) => order.id === dish.id)
  );

  const getQuantity = (dish: Dish) => {
    const order = cartOrders.find((order) => order.id === dish.id);
    return order ? order.quantity : 1;
  };

  const dishesTotalPrice = dishesInCart?.reduce(
    (total, dish) => total + Number(dish.price) * getQuantity(dish),
    0
  );

  const makePayment = async () => {
    try {
      const response = await api.post(
        "/stripe/create-checkout-session",
        {
          cartOrders,
          userId: user?.id,
        },
        { withCredentials: true }
      );
      const { sessionId } = response.data;

      const stripePublicKey = import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY;

      if (!stripePublicKey) {
        throw new Error("Chave pública do Stripe não definida no arquivo .env");
      }

      const stripe = await loadStripe(stripePublicKey);

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      toast("Erro ao iniciar o pagamento. Por favor, tente novamente.");
    }
  };

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
                  deleteOrderFromCart={deleteOrderFromCart}
                />
              ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between">
            <p className="text-3xl font-bold text-light-100">
              Total: {formatPrice(Number(dishesTotalPrice))}
            </p>
            <Button
              title="Finalizar compra"
              className="lg:w-[172px]"
              onClick={makePayment}
            />
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
