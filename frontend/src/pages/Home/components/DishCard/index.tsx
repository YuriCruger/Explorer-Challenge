import { formatPrice } from "@/utils/formatPrice";
import { PiPencilSimpleBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useAuth } from "@/providers/auth";
import { USER_ROLES } from "@/utils/roles";
import { Button } from "../../../../components/Button";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { QuantityCounter } from "../../../../components/QuantityCounter";
import { Ingredient } from "@/types/dish";
import { useState } from "react";
import { useOrders } from "@/providers/orders";
import { toast } from "sonner";
import { IoMdHeart } from "react-icons/io";
import { api } from "@/services/api";
import { FavoriteButton } from "@/components/FavoriteButton";
import { cn } from "@/utils/cn";

interface DishCardProps {
  name: string;
  price: string;
  img: string;
  id: number;
  ingredients: Ingredient[];
  isFavorite: { [userId: string]: boolean };
  className?: string;
}

export function DishCard({
  name,
  price,
  img,
  id,
  ingredients,
  isFavorite,
  className,
}: DishCardProps) {
  const { role, user } = useAuth();
  const { addOrder } = useOrders();
  const formattedPrice = formatPrice(Number(price));
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(user ? isFavorite[user.id] : false);

  const handleAddToCart = () => {
    addOrder(id, name, quantity);
    setQuantity(1);
    toast("Produto adicionado ao carrinho.");
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

  const handleFavoriteToggle = () => {
    if (!user) {
      return;
    }
    if (!favorite) {
      api
        .post("/favorite-products", {
          product_id: id,
          user_id: user.id,
        })
        .then(() => {
          setFavorite(true);
        });
      return;
    }

    api.delete(`/favorite-products/${user.id}/${id}`).then(() => {
      setFavorite(false);
    });
  };

  return (
    <div
      className={cn(
        "relative bg-dark-200 w-[210px] h-[292px] flex flex-col items-center justify-center gap-2 rounded-lg ring-2 ring-dark-100 p-2 lg:w-[304px] lg:h-[462px] lg:gap-4",
        className
      )}
    >
      {role === USER_ROLES.ADMIN ? (
        <Link to={`edit-dish/${id}`}>
          <button className="text-light-300 absolute right-2 top-2">
            <PiPencilSimpleBold size={28} />
          </button>
        </Link>
      ) : (
        <div className="absolute right-2 top-2 z-50 overflow-visible">
          <FavoriteButton handleFavoriteToggle={handleFavoriteToggle}>
            {favorite ? (
              <IoMdHeart size={28} color="red" />
            ) : (
              <CiHeart size={28} />
            )}
          </FavoriteButton>
        </div>
      )}
      <img
        src={`http://localhost:3333/uploads/${img}`}
        alt={`Foto do prato, ${name}`}
        className="h-[88px] w-[88px] rounded-full lg:w-[176px] lg:h-[176px]"
      />

      <Link to={`/dish/${id}`}>
        <button className="text-light-300 flex items-center justify-center w-[210px] px-2 hover:text-tomato-200 transition-colors lg:w-[304px]">
          <p className="text-lg truncate lg:text-3xl">{name}</p>
          <IoIosArrowForward size={20} />
        </button>
      </Link>

      <div className="flex flex-wrap">
        <p className="hidden text-zinc-400 lg:block text-center">
          {ingredients.map((ingredient) => ingredient.name).join(", ")}.
        </p>
      </div>

      <p className="text-cake-200 text-lg lg:text-4xl">{formattedPrice}</p>

      {role === USER_ROLES.CLIENT && (
        <div className="space-y-2 w-full flex flex-col items-center lg:flex-row lg:px-10 lg:gap-3">
          <QuantityCounter
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />

          <Button title="Incluir" onClick={handleAddToCart} />
        </div>
      )}
    </div>
  );
}
