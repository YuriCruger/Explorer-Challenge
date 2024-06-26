export interface Dish {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string | File;
  ingredients: Ingredient[];
  isFavorite: { [userId: string]: boolean };
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  dish_id: number;
  created_at: string;
  updated_at: string;
}
