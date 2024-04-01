import { BannerHome } from "@/pages/Home/components/BannerHome";
import { DishCarouselSection } from "@/pages/Home/components/DishCarouselSection";
import { useDish } from "@/providers/dishes";
import { DISH_CATEGORIES } from "@/utils/dish-categories";
import { useEffect } from "react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const { dishList, fetchErrorOccurred, fetchAllDishes } = useDish();

  useEffect(() => {
    fetchAllDishes();
  }, []);

  if (fetchErrorOccurred) {
    toast(
      "Ocorreu um erro ao buscar os pratos. Por favor, tente novamente mais tarde."
    );
  }

  return (
    <>
      <BannerHome />
      <DishCarouselSection
        sectionTitle={DISH_CATEGORIES.MEAL}
        dishList={dishList}
        category="MEAL"
      />
      <DishCarouselSection
        sectionTitle={DISH_CATEGORIES.DESSERT}
        dishList={dishList}
        category="DESSERT"
      />
      <DishCarouselSection
        sectionTitle={DISH_CATEGORIES.DRINK}
        dishList={dishList}
        category="DRINK"
      />
    </>
  );
}
