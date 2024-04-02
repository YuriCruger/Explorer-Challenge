import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { DishForm } from "@/components/DishForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDish } from "@/providers/dishes";
import { AxiosError, api } from "@/services/api";
import { EditFormSkeleton } from "@/pages/EditDish/components/EditPageSkeleton";
import { useState } from "react";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { toast } from "sonner";

export default function EditDish() {
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const { id } = useParams();
  const { dishList, fetchAllDishes } = useDish();
  const dish = dishList?.find((dish) => dish.id === Number(id));
  const navigate = useNavigate();

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
              toast(axiosError.response.data.message);
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
          toast(axiosError.response.data.message);
        }
      });

    Promise.all([updateImage, updateDish])
      .then(() => {
        toast("Prato atualizado com sucesso");
        fetchAllDishes();
      })
      .catch(() => {
        toast(
          "Erro ao atualizar o prato, por favor tente novamente mais tarde."
        );
      });
  };

  const handleDeleteDish = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmationModalOpen(false);
    api
      .delete(`/dishes/${id}`)
      .then(() => {
        toast("Prato deletado com sucesso.");
        navigate("/");
      })
      .catch(() => {
        toast("Erro ao deletar o prato, por favor tente novamente mais tarde.");
      });
  };

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      <PageTitle title="Editar prato" />

      {!dish ? (
        <EditFormSkeleton />
      ) : (
        <DishForm
          isEdit
          initialValues={dish}
          onSubmit={handleEditDish}
          handleDeleteDish={handleDeleteDish}
        />
      )}
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
