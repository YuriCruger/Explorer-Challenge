import { DishForm } from "@/components/DishForm";
import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { useDish } from "@/hooks/dishes";

export default function NewDish() {
  const { createDish } = useDish();

  const handleCreateDish = (values: any) => {
    createDish(values);
  };

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Novo prato" />

      <DishForm onSubmit={handleCreateDish} />
    </div>
  );
}
