import { Button } from "@/components/Button";

interface DeleteConfirmationModalProps {
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

export function DeleteConfirmationModal({
  handleCancelDelete,
  handleConfirmDelete,
}: DeleteConfirmationModalProps) {
  return (
    <div className="absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] z-50">
      <div className="flex items-center justify-center">
        <div className="bg-dark-600 rounded-lg p-3">
          <p className="text-light-100 font-semibold text-xl">
            Tem certeza de que deseja deletar?
          </p>

          <div className="flex gap-5 mt-5">
            <Button title="Sim" onClick={handleConfirmDelete} />
            <Button
              title="Não"
              className="bg-light-600 hover:bg-light-500"
              onClick={handleCancelDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
