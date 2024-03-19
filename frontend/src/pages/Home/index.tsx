import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { BannerHome } from "@/components/Banner-Home";

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
      <div className="px-7 py-6 w-fit lg:px-32">
        <h3 className="text-light-300 font-medium text-xl">Refeições</h3>
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
