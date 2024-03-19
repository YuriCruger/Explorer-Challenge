import { formatPrice } from "@/utils/formatPrice";
import { PiPencilSimpleBold } from "react-icons/pi";

export function DishCard({ name, price, img }: any) {
  const formattedPrice = formatPrice(price);
  return (
    <div className="relative bg-dark-200 w-[210px] h-[292px] flex flex-col items-center justify-center gap-2 rounded-lg ring-2 ring-dark-100">
      <button className="text-light-300 absolute right-2 top-2">
        <PiPencilSimpleBold size={28} />
      </button>
      <img
        src={`http://localhost:3333/uploads/${img}`}
        alt=""
        className="h-[88px] w-[88px] rounded-full"
      />
      <p className="text-light-300 text-lg">{name}</p>
      <p className="text-cake-200 text-lg">{formattedPrice}</p>
    </div>
  );
}
