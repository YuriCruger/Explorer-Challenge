import { IoMdClose } from "react-icons/io";

interface NewIngredientProps {
  ingredient: string;
  onDelete: () => void;
}

export function NewIngredient({ ingredient, onDelete }: NewIngredientProps) {
  return (
    <div className="flex items-center gap-2 border-2 border-dashed border-light-500 rounded-lg px-2 py-1 w-fit bg-light-600">
      <pre className="text-light-100">
        <code>{ingredient}</code>
      </pre>
      <button
        onClick={onDelete}
        type="button"
        className="text-light-100 hover:text-red-500 transition-colors"
      >
        <IoMdClose />
      </button>
    </div>
  );
}
