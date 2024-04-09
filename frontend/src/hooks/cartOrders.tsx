import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartOrdersProviderProps {
  children: ReactNode;
}

interface Orders {
  id: number;
  name: string;
  quantity: number;
}

interface CartOrdersContextProps {
  addOrderToCart: (
    orderId: number,
    orderName: string,
    orderQuantity: number
  ) => void;
  deleteOrderFromCart: (orderId: number) => void;
  clearOrdersFromCart: () => void;
  cartOrders: Orders[];
}

const CartOrdersContext = createContext<CartOrdersContextProps | null>(null);

const CartOrdersProvider = ({ children }: CartOrdersProviderProps) => {
  const [cartOrders, setCartOrders] = useState<Orders[]>(() => {
    const savedOrders = localStorage.getItem("cartOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrderToCart = (
    orderId: number,
    orderName: string,
    orderQuantity: number
  ) => {
    if (cartOrders.some((order) => order.id === orderId)) {
      setCartOrders(
        cartOrders.map((order) =>
          order.id === orderId
            ? { ...order, quantity: order.quantity + orderQuantity }
            : order
        )
      );
      return;
    }
    setCartOrders([
      ...cartOrders,
      { id: orderId, name: orderName, quantity: orderQuantity },
    ]);
  };

  const deleteOrderFromCart = (orderId: number) => {
    setCartOrders((prevState) =>
      prevState.filter((order) => order.id !== orderId)
    );
  };

  const clearOrdersFromCart = () => {
    setCartOrders([]);
  };

  useEffect(() => {
    localStorage.setItem("cartOrders", JSON.stringify(cartOrders));
  }, [cartOrders]);

  return (
    <CartOrdersContext.Provider
      value={{
        addOrderToCart,
        deleteOrderFromCart,
        clearOrdersFromCart,
        cartOrders,
      }}
    >
      {children}
    </CartOrdersContext.Provider>
  );
};

function useOrders() {
  const context = useContext(CartOrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }

  return context;
}

export { CartOrdersProvider, useOrders };
