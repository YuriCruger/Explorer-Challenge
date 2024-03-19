import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { BannerHome } from "@/components/BannerHome";
import { SectionTitle } from "@/components/SectionTitle";
import { DishCard } from "@/components/DishCard";

export default function Home() {
  const [dishes, setDishes] = useState([]);

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

      <div className="px-7">
        <DishCard />
      </div>
    </>
  );
}

{
  /* {dishes.map((dish) => (
  <div key={dish.id}>
    <img
      src={`http://localhost:3333/uploads/${dish.image}`}
      alt={dish.name}
    />

    <h2>{dish.name}</h2>
  </div>
))} */
}
