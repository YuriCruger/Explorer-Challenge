import { PiPencilSimpleBold } from "react-icons/pi";

export function DishCard() {
  return (
    <div className="relative bg-dark-200 w-[210px] h-[292px] flex flex-col items-center justify-center gap-2 rounded-lg ring-2 ring-dark-100">
      <button className="text-light-300 absolute right-2 top-2">
        <PiPencilSimpleBold size={28} />
      </button>
      <img src="" alt="" className="h-[88px] w-[88px] rounded-full" />
      <p className="text-light-300 text-lg">Salada Ravanello</p>
      <p className="text-cake-200 text-lg">R$ 49,97</p>
    </div>
  );
}
