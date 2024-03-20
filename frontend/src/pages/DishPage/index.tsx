import { Button } from "@/components/Button";
import { IngredientsList } from "@/components/IngredientsList";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { QuantityCounter } from "@/components/QuantityCounter";
import { useAuth } from "@/hooks/auth";
import { useDish } from "@/hooks/dishes";
import { USER_ROLES } from "@/utils/roles";

import { Link, useParams } from "react-router-dom";

export default function DishPage() {
  const { role } = useAuth();
  const { dishList, fetchErrorOccurred } = useDish();
  const { id } = useParams();

  const dish = dishList?.find((dish) => dish.id === Number(id));

  if (fetchErrorOccurred) {
    alert(
      "Ocorreu um erro ao buscar o prato. Por favor, tente novamente mais tarde."
    );
  }

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      <div className="text-light-300 flex flex-col items-center pt-3 gap-5 lg:flex-row lg:gap-10 lg:pt-12">
        <img
          src={`http://localhost:3333/uploads/${dish?.image}`}
          alt={`Foto do prato, ${dish?.name}`}
          className="h-[264px] w-[264px] rounded-full lg:h-[490px] lg:w-[490px]"
        />

        <div className="space-y-5">
          <h1 className="font-medium text-4xl text-center lg:text-start lg:text-6xl">
            {dish?.name}
          </h1>

          <p className="text-center max-w-[650px] lg:text-start lg:text-xl">
            {dish?.description}
          </p>

          <div className="flex items-center justify-center gap-5 flex-wrap lg:justify-start">
            {dish?.ingredients.map((ingredient) => (
              <IngredientsList
                key={ingredient.id}
                ingredient={ingredient.name}
              />
            ))}
          </div>

          {role === USER_ROLES.ADMIN ? (
            <div>
              <Link to={`/edit-dish/${dish?.id}`}>
                <Button title="Editar prato" className="lg:max-w-[162px]" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full gap-5 lg:justify-start">
              <QuantityCounter />

              <Button
                title="Pedir"
                className="flex-1 max-w-[370px] lg:max-w-[162px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
