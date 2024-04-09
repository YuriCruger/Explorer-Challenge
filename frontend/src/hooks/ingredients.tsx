import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface IngredientsProviderProps {
  children: ReactNode;
}

interface IngredientsContextProps {
  addIngredientToList: (newIngredient: string) => void;
  removeIngredientFromList: (ingredientToRemove: string) => void;
  ingredientList: string[];
  updateIngredientList: (data: string[]) => void;
}

const IngredientsContext = createContext<IngredientsContextProps | null>(null);

function IngredientsProvider({ children }: IngredientsProviderProps) {
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  function addIngredientToList(newIngredient: string) {
    if (ingredientList.includes(newIngredient)) {
      return toast("Você já possui esse ingrediente");
    }
    setIngredientList([newIngredient, ...ingredientList]);
  }

  function removeIngredientFromList(ingredientToRemove: string) {
    setIngredientList(
      ingredientList.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function updateIngredientList(data: string[]) {
    setIngredientList(data);
  }

  return (
    <IngredientsContext.Provider
      value={{
        addIngredientToList,
        removeIngredientFromList,
        ingredientList,
        updateIngredientList,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  const context = useContext(IngredientsContext);

  if (!context) {
    throw new Error(
      "useIngredients must be used within an IngredientsProvider"
    );
  }

  return context;
}

export { IngredientsProvider, useIngredients };
