import { AxiosError, api } from "@/services/api";
import { Dish } from "@/types/dish";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface DishProviderProps {
  children: ReactNode;
}

interface createContextProps {
  fetchAllDishes: () => void;
  dishList: Dish[] | null;
  fetchErrorOccurred: boolean;
  updateDishImage: (values: string | File, id: string | undefined) => void;
  updateDish: (values: Dish, id: string | undefined) => void;
  deleteDish: (id: string | undefined) => void;
  createDish: (values: Dish) => void;
}

const DishContext = createContext<createContextProps | null>(null);

function DishProvider({ children }: DishProviderProps) {
  const [dishList, setDishList] = useState<Dish[] | null>(null);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  async function fetchAllDishes() {
    try {
      const response = await api.get("/dishes", { withCredentials: true });

      setDishList(response.data);
    } catch (error) {
      setFetchErrorOccurred(true);
      console.log(error);
    }
  }

  async function updateDishImage(
    values: string | File,
    id: string | undefined
  ) {
    const imageFormData = new FormData();
    if (values instanceof File) {
      imageFormData.append("image", values);
      return api
        .patch(`/dishes/image/${id}`, imageFormData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            console.log(axiosError.response.data.message);
          }
        });
    }
  }

  async function updateDish(values: Dish, id: string | undefined) {
    return api
      .patch(
        `/dishes/${id}`,
        {
          name: values.name,
          category: values.category,
          ingredients: values.ingredients.join(","),
          price: values.price,
          description: values.description,
        },
        { withCredentials: true }
      )
      .catch((error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log(axiosError.response.data.message);
        }
      });
  }

  async function deleteDish(id: string | undefined) {
    return api
      .delete(`/dishes/${id}`, { withCredentials: true })
      .then(() => {
        toast("Prato deletado com sucesso.");
        return fetchAllDishes();
      })
      .catch((error) => {
        toast("Erro ao deletar o prato, por favor tente novamente mais tarde.");
        throw new Error(error);
      });
  }

  async function createDish(values: Dish) {
    await api
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
          withCredentials: true,
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
        if (axiosError.response.data.message) {
          toast(axiosError.response.data.message);
        } else {
          toast(
            "Erro ao adicionar o produto, por favor tente novamente mais tarde."
          );
          console.error(error.message);
        }
      });
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
        updateDishImage,
        updateDish,
        deleteDish,
        createDish,
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
