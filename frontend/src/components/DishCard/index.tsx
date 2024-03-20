import { formatPrice } from "@/utils/formatPrice";
import { PiPencilSimpleBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useAuth } from "@/hooks/auth";
import { USER_ROLES } from "@/utils/roles";
import { Button } from "../Button";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { QuantityCounter } from "../QuantityCounter";
import { Ingredient } from "@/types/dish";

interface DishCardProps {
  name: string;
  price: number;
  img: string;
  id: number;
  ingredients: Ingredient[];
}

export function DishCard({ name, price, img, id, ingredients }: DishCardProps) {
  const { role } = useAuth();
  const formattedPrice = formatPrice(price);

  return (
    <div className="relative bg-dark-200 w-[210px] h-[292px] flex flex-col items-center justify-center gap-2 rounded-lg ring-2 ring-dark-100 p-2 lg:w-[304px] lg:h-[462px] lg:gap-4">
      {role === USER_ROLES.ADMIN ? (
        <button className="text-light-300 absolute right-2 top-2">
          <PiPencilSimpleBold size={28} />
        </button>
      ) : (
        <button className="text-light-300 absolute right-2 top-2">
          <CiHeart size={28} />
        </button>
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
          <QuantityCounter />

          <Button title="Incluir" />
        </div>
      )}
    </div>
  );
}
