import { DishForm } from "@/components/DishForm";
import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { useDish } from "@/providers/dishes";
import { AxiosError, api } from "@/services/api";
import { toast } from "sonner";

export default function NewDish() {
  const { fetchAllDishes } = useDish();
  const handleAddDish = (values: any) => {
    const formData = new FormData();
    if (values.image instanceof Blob) {
      formData.append("image", values.image);
    }
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("ingredients", values.ingredients.join(","));
    formData.append("price", values.price);
    formData.append("description", values.description);

    api
      .post(
        "/dishes",
        {
          name: values.name,
          category: values.category,
          ingredients: values.ingredients,
          price: values.price,
          description: values.description,
          image: values.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        toast("Prato adicionado com sucesso.");
        fetchAllDishes();
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          toast(axiosError.response.data.message);
        }
      });
  };
  return (
    <div className="px-7 pt-3 pb-12 space-y-6 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Novo prato" />

      <DishForm onSubmit={handleAddDish} />
    </div>
  );
}
