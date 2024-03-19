import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export function AddNewIngredient({ handleNewIngredient }: any) {
  const [newIngredientName, setNewIngredientName] = useState("");

  function addNewIngredient() {
    handleNewIngredient(newIngredientName);
    setNewIngredientName("");
  }

  return (
    <div className="flex items-center border-2 border-dashed border-light-500 rounded-lg px-2 py-1 w-fit">
      <input
        id="ingredients"
        value={newIngredientName}
        onChange={(e) =>
          setNewIngredientName(e.target.value.toLocaleLowerCase())
        }
        className="bg-transparent w-[80px] focus:outline-none placeholder:text-light-500"
        placeholder="Adicionar"
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
