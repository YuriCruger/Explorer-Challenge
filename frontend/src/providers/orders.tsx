import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface OrdersProviderProps {
  children: ReactNode;
}

interface Orders {
  id: number;
  name: string;
  quantity: number;
}

interface OrdersContextProps {
  addOrder: (orderId: number, orderName: string, orderQuantity: number) => void;
  deleteOrder: (orderId: number) => void;
  clearOrders: () => void;
  orders: Orders[];
}

const OrdersContext = createContext<OrdersContextProps | null>(null);

const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Orders[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (
    orderId: number,
    orderName: string,
    orderQuantity: number
  ) => {
    if (orders.some((order) => order.id === orderId)) {
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, quantity: order.quantity + orderQuantity }
            : order
        )
      );
      return;
    }
    setOrders([
      ...orders,
      { id: orderId, name: orderName, quantity: orderQuantity },
    ]);
  };

  const deleteOrder = (orderId: number) => {
    setOrders((prevState) => prevState.filter((order) => order.id !== orderId));
  };

  const clearOrders = () => {
    setOrders([]);
  };

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        addOrder,
        deleteOrder,
        clearOrders,
        orders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }

  return context;
}

export { OrdersProvider, useOrders };
