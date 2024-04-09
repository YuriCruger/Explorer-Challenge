import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { useDish } from "@/hooks/dishes";
import { DishCard } from "../Home/components/DishCard";
import { useAuth } from "@/hooks/auth";

export default function Favorites() {
  const { dishList } = useDish();
  const { user } = useAuth();

  const favoriteDishes = dishList?.filter(
    (dish) => user && dish.isFavorite[user.id]
  );

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />
      <PageTitle title="Pratos Favoritos" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {favoriteDishes?.map((dish) => (
          <DishCard
            key={dish.id}
            name={dish.name}
            price={dish.price}
            img={dish.image}
            id={dish.id}
            ingredients={dish.ingredients}
            isFavorite={dish.isFavorite}
            className="w-full lg:w-full"
          />
        ))}
      </div>
    </div>
  );
}
