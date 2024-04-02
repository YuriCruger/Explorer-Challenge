export interface Order {
  created_at: string;
  id: number;
  products: OrderProducts[];
  status: string;
  total_price: number;
  user_id: number;
}

export interface OrderProducts {
  id: number;
  name: string;
  order_id: number;
  quantity: number;
}
