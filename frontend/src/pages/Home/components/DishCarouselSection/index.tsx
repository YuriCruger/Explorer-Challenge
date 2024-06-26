import { DishCardSkeleton } from "@/pages/Home/components/DishCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SectionTitle } from "@/components/SectionTitle";
import { DishCard } from "@/pages/Home/components/DishCard";
import { Dish } from "@/types/dish";
import { useSearch } from "@/hooks/search";

interface DishCarouselSectionProps {
  dishList: Dish[] | null;
  sectionTitle: string;
  category: string;
}

export function DishCarouselSection({
  dishList,
  sectionTitle,
  category,
}: DishCarouselSectionProps) {
  const { search } = useSearch();

  const filteredDishes =
    search !== ""
      ? dishList?.filter(
          (dish) =>
            dish.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            dish.ingredients.some((ingredient) =>
              ingredient.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
        )
      : dishList;

  return (
    <>
      <SectionTitle title={sectionTitle} />

      <div className="flex px-7 mb-12 xl:px-32 ">
        <Swiper
          className="ml-0"
          slidesPerView={"auto"}
          spaceBetween={30}
          modules={[Navigation]}
          navigation
        >
          {filteredDishes ? (
            filteredDishes.map((dish) => {
              if (dish.category === category) {
                return (
                  <SwiperSlide key={dish.id} style={{ width: "auto" }}>
                    <DishCard
                      name={dish.name}
                      price={dish.price}
                      img={dish.image}
                      id={dish.id}
                      ingredients={dish.ingredients}
                      isFavorite={dish.isFavorite}
                    />
                  </SwiperSlide>
                );
              }
            })
          ) : (
            <SwiperSlide
              style={{ width: "auto", display: "flex", gap: "30px" }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <DishCardSkeleton key={index} />
              ))}
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
}
