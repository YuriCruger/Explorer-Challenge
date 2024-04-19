import { useAuth } from "@/hooks/auth";
import { CartOrderItemProps, deleteCartOrderProps } from "@/types/cartOrder";
import { formatPrice } from "@/utils/formatPrice";

interface OrderItemProps {
  cart_item: CartOrderItemProps;
  deleteCartOrder: ({ user_id, item_id }: deleteCartOrderProps) => void;
  quantity: number;
}

export function OrderItem({
  cart_item,
  deleteCartOrder,
  quantity,
}: OrderItemProps) {
  const { user } = useAuth();
  return (
    <div className="py-5 flex flex-col gap-2 lg:flex-row">
      <div>
        <div className="flex gap-5">
          <img
            src={`https://explorer-challenge.onrender.com/uploads/${cart_item.image}`}
            alt={`Foto do ${cart_item.name}`}
            className="h-[100px] w-[100px] rounded-full lg:w-[176px] lg:h-[176px]"
          />

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{cart_item.name}</h3>
            <p className="text-light-300">
              {cart_item.ingredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
              .
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <p className="text-sm text-zinc-400 mt-auto">
                Quantidade: {quantity}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start lg:ml-auto">
        <p className="text-2xl font-bold">{formatPrice(cart_item.price)}</p>
        <button
          onClick={() =>
            user &&
            deleteCartOrder({
              user_id: user.id,
              item_id: cart_item.id,
            })
          }
          className="mt-auto text-tomato-200 hover:underline lg:ml-auto"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
