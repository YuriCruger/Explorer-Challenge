import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { DishForm } from "@/components/DishForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDish } from "@/hooks/dishes";
import { EditFormSkeleton } from "@/pages/EditDish/components/EditPageSkeleton";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { toast } from "sonner";
import { useConfirmModal } from "@/hooks/confirmModal";
import { Dish } from "@/types/dish";

export default function EditDish() {
  const { id } = useParams();
  const {
    handleDeleteDish,
    handleCancelDelete,
    isDeleteConfirmationModalOpen,
  } = useConfirmModal();
  const { dishList, fetchAllDishes, updateDishImage, updateDish, deleteDish } =
    useDish();
  const dish = dishList?.find((dish) => dish.id === Number(id));
  const navigate = useNavigate();

  const handleEditDish = async (values: Dish) => {
    try {
      await Promise.all([
        updateDishImage(values.image, id),
        updateDish(values, id),
      ]);
      fetchAllDishes();
      toast("Prato atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o prato:", error);
      toast("Erro ao atualizar o prato, por favor tente novamente mais tarde.");
    }
  };

  const handleConfirmDelete = async () => {
    handleCancelDelete();
    try {
      await deleteDish(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
