import { formatPrice } from "@/utils/formatPrice";
import { PiPencilSimpleBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useAuth } from "@/hooks/auth";
import { USER_ROLES } from "@/utils/roles";
import { Button } from "../../../../components/Button";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { QuantityCounter } from "../../../../components/QuantityCounter";
import { Ingredient } from "@/types/dish";
import { useState } from "react";
import { useCartOrders } from "@/hooks/cartOrders";
import { IoMdHeart } from "react-icons/io";
import { api } from "@/services/api";
import { FavoriteButton } from "@/components/FavoriteButton";
import { cn } from "@/utils/cn";
import { useDish } from "@/hooks/dishes";

interface DishCardProps {
  name: string;
  price: number;
  img: string | File;
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
  const { user } = useAuth();
  const { addOrderToCart } = useCartOrders();
  const formattedPrice = formatPrice(Number(price));
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(user ? isFavorite[user.id] : false);
  const { fetchAllDishes } = useDish();

  const handleAddToCartStore = () => {
    if (user) {
      addOrderToCart({
        user_id: user.id,
        dish_id: id,
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

  const handleFavoriteToggle = () => {
    if (!user) {
      return;
    }
    if (!favorite) {
      api
        .post(
          "/favorite-products",
          {
            product_id: id,
            user_id: user.id,
          },
          { withCredentials: true }
        )
        .then(() => {
          setFavorite(true);
          fetchAllDishes();
        });
      return;
    }

    api
      .delete(`/favorite-products/${user.id}/${id}`, { withCredentials: true })
      .then(() => {
        setFavorite(false);
        fetchAllDishes();
      });
  };

  return (
    <div
      className={cn(
        "relative bg-dark-200 w-[210px] h-[292px] flex flex-col items-center justify-center gap-2 rounded-lg ring-2 ring-dark-100 p-2 lg:w-[304px] lg:h-[462px] lg:gap-4",
        className
      )}
    >
      {user && user.role === USER_ROLES.ADMIN ? (
        <Link to={`edit-dish/${id}`}>
          <button className="text-light-300 absolute right-2 top-2 hover:scale-110 transition-all">
            <PiPencilSimpleBold size={26} />
          </button>
        </Link>
      ) : (
        <div className="absolute right-2 top-2 z-10 overflow-visible">
          <FavoriteButton handleFavoriteToggle={handleFavoriteToggle}>
            {favorite ? (
              <IoMdHeart size={26} color="red" />
            ) : (
              <CiHeart size={26} />
            )}
          </FavoriteButton>
        </div>
      )}
      <img
        src={`https://explorer-challenge.onrender.com/uploads/${img}`}
        alt={`Foto do prato, ${name}`}
        className="h-[88px] w-[88px] rounded-full lg:w-[176px] lg:h-[176px] hover:scale-110 transition-all"
      />

      <Link to={`/dish/${id}`}>
        <button className="text-light-300 flex items-center justify-center w-[210px] px-2 hover:text-tomato-200 transition-colors lg:w-[304px]">
          <p className="text-lg truncate lg:text-3xl">{name}</p>
          <IoIosArrowForward size={20} />
        </button>
      </Link>

      <div className="flex flex-wrap">
        <p className="text-zinc-400 text-center line-clamp-2 max-lg:hidden">
          {ingredients.map((ingredient) => ingredient.name).join(", ")}.
        </p>
      </div>

      <p className="text-cake-200 text-lg lg:text-4xl">{formattedPrice}</p>

      {user && user.role === USER_ROLES.CLIENT && (
        <div className="space-y-2 w-full flex flex-col items-center lg:flex-row lg:px-10 lg:gap-3">
          <QuantityCounter
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />

          <Button title="Incluir" onClick={handleAddToCartStore} />
        </div>
      )}
    </div>
  );
}
