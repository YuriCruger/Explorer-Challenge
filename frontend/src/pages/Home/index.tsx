import { BannerHome } from "@/components/BannerHome";
import { SectionTitle } from "@/components/SectionTitle";
import { DishCard } from "@/components/DishCard";
import { useDish } from "@/hooks/dishes";
import { DishCardSkeleton } from "@/components/DishCardSkeleton";

export default function Home() {
  const { dishList, fetchErrorOccurred } = useDish();

  if (fetchErrorOccurred) {
    alert(
      "Ocorreu um erro ao buscar os pratos. Por favor, tente novamente mais tarde."
    );
  }

  return (
    <>
      <BannerHome />
      <SectionTitle title="Refeições" />

      <div className="flex gap-5 px-7 mb-12 xl:px-32">
        {dishList
          ? dishList.map((dish) => (
              <DishCard
                key={dish.id}
                name={dish.name}
                price={dish.price}
                img={dish.image}
                id={dish.id}
                ingredients={dish.ingredients}
              />
            ))
          : Array(5)
              .fill(0)
              .map((_, index) => <DishCardSkeleton key={index} />)}
      </div>
    </>
  );
}
