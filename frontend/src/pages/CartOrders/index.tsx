import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { OrderItem } from "./components/OrderItem";
import { Button } from "@/components/Button";
import { useCartOrders } from "@/hooks/cartOrders";
import { formatPrice } from "@/utils/formatPrice";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/auth";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { CartOrderItemProps } from "@/types/cartOrder";

export default function CartOrders() {
  const { deleteCartOrder, getCartOrders, cartStore } = useCartOrders();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getCartOrders(user.id);
    }
  }, []);

  const cartOrderItems = cartStore?.cartOrderItems;

  const simplifiedCartItems = cartOrderItems?.map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  let totalOrderPrice = 0;
  const cartOrders = cartStore?.cartOrders;

  if (cartOrders) {
    cartOrders.forEach((cart: any) => {
      totalOrderPrice += cart.total_price;
    });
  }

  const makePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await api.post(
        "/stripe/create-checkout-session",
        {
          cartOrders: simplifiedCartItems,
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
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      {cartOrders.length > 0 ? (
        <>
          <PageTitle title="Carrinho de compras" />

          <div className="divide-light-500 divide-y-2 text-light-100 bg-dark-600 p-5 rounded-lg">
            {cartOrderItems.length > 0 &&
              cartOrderItems.map((item: CartOrderItemProps) => (
                <OrderItem
                  key={item.id}
                  cart_item={item}
                  quantity={item.quantity}
                  deleteCartOrder={deleteCartOrder}
                />
              ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between">
            <p className="text-3xl font-bold text-light-100">
              Total: {formatPrice(totalOrderPrice)}
            </p>
            <Button
              title="Finalizar compra"
              className={`lg:w-[172px] ${isProcessingPayment && "opacity-50"}`}
              onClick={makePayment}
              disabled={isProcessingPayment}
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
