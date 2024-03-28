import { api } from "@/services/api";
import { Dish } from "@/types/dish";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DishProviderProps {
  children: ReactNode;
}

interface createContextProps {
  fetchAllDishes: () => void;
  dishList: Dish[] | null;
  fetchErrorOccurred: boolean;
}

const DishContext = createContext<createContextProps | null>(null);

function DishProvider({ children }: DishProviderProps) {
  const [dishList, setDishList] = useState<Dish[] | null>(null);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  async function fetchAllDishes() {
    try {
      const response = await api.get("/dishes");

      setDishList(response.data);
    } catch (error) {
      setFetchErrorOccurred(true);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllDishes();
  }, []);

  return (
    <DishContext.Provider
      value={{
        fetchAllDishes,
        dishList,
        fetchErrorOccurred,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}

function useDish() {
  const context = useContext(DishContext);

  if (!context) {
    throw new Error("useDish must be used within an DishProvider");
  }

  return context;
}

export { DishProvider, useDish };
