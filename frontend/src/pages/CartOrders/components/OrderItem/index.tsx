import { Dish } from "@/types/dish";
import { formatPrice } from "@/utils/formatPrice";

interface OrderItemProps {
  dish: Dish;
  deleteOrderFromCart: (orderId: number) => void;
  quantity: number;
}

export function OrderItem({
  dish,
  deleteOrderFromCart,
  quantity,
}: OrderItemProps) {
  return (
    <div className="py-5 flex flex-col gap-2 lg:flex-row">
      <div>
        <div className="flex gap-5">
          <img
            src={`http://localhost:3333/uploads/${dish.image}`}
            alt=""
            className="h-[100px] w-[100px] rounded-full lg:w-[176px] lg:h-[176px]"
          />

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{dish.name}</h3>
            <p className="text-light-300">
              {dish.ingredients.map((ingredient) => ingredient.name).join(", ")}
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
        <p className="text-2xl font-bold">{formatPrice(dish.price)}</p>

        <button
          onClick={() => deleteOrderFromCart(dish.id)}
          className="mt-auto text-tomato-200 hover:underline lg:ml-auto"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
