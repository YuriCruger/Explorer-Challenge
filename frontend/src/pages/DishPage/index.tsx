import { Button } from "@/components/Button";
import { IngredientsList } from "@/components/IngredientsList";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { QuantityCounter } from "@/components/QuantityCounter";
import { useAuth } from "@/hooks/auth";
import { useDish } from "@/hooks/dishes";
import { useCartOrders } from "@/hooks/cartOrders";
import { Dish } from "@/types/dish";
import { USER_ROLES } from "@/utils/roles";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DishPage() {
  const { dishList, fetchErrorOccurred } = useDish();
  const { user } = useAuth();
  const { id } = useParams();
  const { addOrderToCart } = useCartOrders();
  const [quantity, setQuantity] = useState(1);
  const [dish, setDish] = useState<Dish | null>(null);

  useEffect(() => {
    const foundDish = dishList?.find((d) => d.id === Number(id));
    if (foundDish !== undefined) {
      setDish(foundDish);
    }
  }, [dishList, id]);

  const handleAddToCartStore = () => {
    if (dish && user) {
      addOrderToCart({
        user_id: user?.id,
        dish_id: dish?.id,
        dish_quantity: quantity,
      });
    }
  };

  const handleIncrement = () => {
    if (quantity >= 10) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  if (fetchErrorOccurred) {
    toast(
      "Ocorreu um erro ao buscar o prato. Por favor, tente novamente mais tarde."
    );
  }

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      {dish && (
        <div className="text-light-300 flex flex-col items-center pt-3 gap-5 lg:flex-row lg:gap-10 lg:pt-12">
          <img
            src={`https://explorer-challenge.onrender.com/uploads/${dish.image}`}
            alt={`Foto do prato, ${dish.name}`}
            className="h-[264px] w-[264px] rounded-full lg:h-[490px] lg:w-[490px]"
          />

          <div className="space-y-5">
            <h1 className="font-medium text-4xl text-center lg:text-start lg:text-6xl">
              {dish.name}
            </h1>

            <p className="text-center max-w-[650px] lg:text-start lg:text-xl">
              {dish.description}
            </p>

            <div className="flex items-center justify-center gap-5 flex-wrap lg:justify-start">
              {dish.ingredients.map((ingredient) => (
                <IngredientsList
                  key={ingredient.id}
                  ingredient={ingredient.name}
                />
              ))}
            </div>

            {user && user.role === USER_ROLES.ADMIN ? (
              <div>
                <Link to={`/edit-dish/${dish.id}`}>
                  <Button
                    title="Editar prato"
                    className="max-w-[370px] px-10"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full gap-5 lg:justify-start">
                <QuantityCounter
                  quantity={quantity}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />

                <Button
                  onClick={handleAddToCartStore}
                  title="Pedir"
                  className="flex-1 max-w-[370px] px-10"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
