import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { DishForm } from "@/components/DishForm";
import { useParams } from "react-router-dom";
import { useDish } from "@/hooks/dishes";
import { AxiosError, api } from "@/services/api";
import { EditFormSkeleton } from "@/components/EditPageSkeleton";

export default function EditDish() {
  const { id } = useParams();
  const { dishList, fetchAllDishes } = useDish();
  const dish = dishList?.find((dish) => dish.id === Number(id));

  const handleEditDish = (values: any) => {
    const updateImage = new Promise<void>((resolve, reject) => {
      const imageFormData = new FormData();
      if (values.image instanceof Blob) {
        imageFormData.append("image", values.image);
        api
          .patch(`/dishes/image/${id}`, imageFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
              alert(axiosError.response.data.message);
            }
            reject();
          });
      } else {
        resolve();
      }
    });

    const updateDish = api
      .patch(`/dishes/${id}`, {
        name: values.name,
        category: values.category,
        ingredients: values.ingredients.join(","),
        price: values.price,
        description: values.description,
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          alert(axiosError.response.data.message);
        }
      });

    Promise.all([updateImage, updateDish])
      .then(() => {
        alert("Prato atualizado com sucesso");
        fetchAllDishes();
      })
      .catch(() => {
        console.log("Alguma das requisições falhou");
      });
  };

  return (
    <div className="px-7 pt-3 pb-12 space-y-6 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Editar prato" />

      {!dish ? (
        <EditFormSkeleton />
      ) : (
        <DishForm isEdit initialValues={dish} onSubmit={handleEditDish} />
      )}
    </div>
  );
}
