import { Ingredient } from "./dish";

export interface CartOrderItemProps {
  id: number;
  cart_id: number;
  dish_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  ingredients: Ingredient[];
  created_at: string;
  updated_at: string;
}

export interface CartOrderProps {
  id: number;
  user_id: number;
  quantity: number;
  total_price: number;
  payment_status: string;
}

export interface CartStoreProps {
  cartOrderItems: CartOrderItemProps[];
  cartOrders: CartOrderProps[];
}

export interface deleteCartOrderProps {
  user_id: number;
  item_id: number;
}

export interface addOrderToCartProps {
  user_id: number;
  dish_id: number;
  dish_quantity: number;
}
