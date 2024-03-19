import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { BannerHome } from "@/components/BannerHome";
import { SectionTitle } from "@/components/SectionTitle";
import { DishCard } from "@/components/DishCard";
import { Dish } from "@/types/dish";

export default function Home() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    api
      .get("/dishes")
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <>
      <BannerHome />
      <SectionTitle title="Refeições" />

      <div className="flex gap-5 px-7">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            name={dish.name}
            price={dish.price}
            img={dish.image}
          />
        ))}
      </div>
    </>
  );
}
