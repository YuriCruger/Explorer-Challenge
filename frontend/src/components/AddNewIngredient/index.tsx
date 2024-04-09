import { useIngredients } from "@/hooks/ingredients";
import { useRef } from "react";
import { IoIosAdd } from "react-icons/io";

export function AddNewIngredient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addIngredientToList } = useIngredients();

  const addNewIngredient = () => {
    const newIngredientName = inputRef.current?.value
      .trim()
      .toLocaleLowerCase();
    if (newIngredientName) {
      addIngredientToList(newIngredientName);
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="flex items-center border-2 border-dashed border-light-500 rounded-lg px-2 py-1 w-fit">
      <input
        ref={inputRef}
        id="ingredients"
        className="bg-transparent text-light-100 focus:outline-none placeholder:text-light-500"
        placeholder="Adicionar"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNewIngredient();
          }
        }}
      />
      <button
        onClick={addNewIngredient}
        type="button"
        className="hover:text-yellow-500 transition-colors"
      >
        <IoIosAdd size={19} />
      </button>
    </div>
  );
}
