import { api } from "@/services/api";
import {
  CartStoreProps,
  addOrderToCartProps,
  deleteCartOrderProps,
} from "@/types/cartOrder";
import { AxiosError } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface CartOrdersProviderProps {
  children: ReactNode;
}

interface CartOrdersContextProps {
  addOrderToCart: ({
    user_id,
    dish_id,
    dish_quantity,
  }: addOrderToCartProps) => void;
  getCartOrders: (userId: number) => void;
  cartStore: any;
  deleteCartOrder: ({ user_id, item_id }: deleteCartOrderProps) => void;
}

const CartOrdersContext = createContext<CartOrdersContextProps | null>(null);

const CartOrdersProvider = ({ children }: CartOrdersProviderProps) => {
  const [cartStore, setCartStore] = useState<CartStoreProps | null>(null);

  const addOrderToCart = async ({
    user_id,
    dish_id,
    dish_quantity,
  }: addOrderToCartProps) => {
    await api
      .post("/cart-store", {
        userId: user_id,
        cartItem: {
          dish_id,
          quantity: dish_quantity,
        },
      })
      .then(() => {
        toast("Produto adicionado ao carrinho.");
        getCartOrders(user_id);
      })
      .catch((error) => {
        toast("Erro ao adicionar o produto ao carrinho");
        console.log(error.response.data.message);
      });
  };

  const getCartOrders = async (userId: number) => {
    try {
      const response = await api.get(`/cart-store/${userId}`);

      if (response.data) {
        setCartStore(response.data);
      } else {
        setCartStore(null);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
      toast(`Erro ao buscar itens do carrinho`);
    }
  };

  const deleteCartOrder = async ({
    user_id,
    item_id,
  }: deleteCartOrderProps) => {
    await api
      .delete(`/cart-store/${user_id}/${item_id}`)
      .then(() => getCartOrders(user_id))
      .catch((error) => {
        toast("Erro ao remover o produto do carrinho");
        console.log(error.response.data.message);
      });
  };

  return (
    <CartOrdersContext.Provider
      value={{
        addOrderToCart,
        getCartOrders,
        cartStore,
        deleteCartOrder,
      }}
    >
      {children}
    </CartOrdersContext.Provider>
  );
};

function useCartOrders() {
  const context = useContext(CartOrdersContext);

  if (!context) {
    throw new Error("useCartOrders must be used within an OrdersProvider");
  }

  return context;
}

export { CartOrdersProvider, useCartOrders };
