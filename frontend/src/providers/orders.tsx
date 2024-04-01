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
  quantity: number;
}

interface OrdersContextProps {
  addOrder: (newOrder: number, quantity: number) => void;
  deleteOrder: (orderId: number) => void;
  orders: Orders[];
}

const OrdersContext = createContext<OrdersContextProps | null>(null);

const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Orders[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (newOrder: number, quantity: number) => {
    if (orders.some((order) => order.id === newOrder)) {
      setOrders(
        orders.map((order) =>
          order.id === newOrder
            ? { ...order, quantity: order.quantity + quantity }
            : order
        )
      );
      return;
    }
    setOrders([...orders, { id: newOrder, quantity }]);
  };

  const deleteOrder = (orderId: number) => {
    setOrders((prevState) => prevState.filter((order) => order.id !== orderId));
  };

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        addOrder,
        deleteOrder,
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
