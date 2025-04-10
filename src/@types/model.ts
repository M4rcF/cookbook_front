export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export type Recipe = {
  id?: number;
  name: string;
  image_url: string;
  category: string;
  origin: string;
  instructions: string;
  ingredients: string[];
  public?: boolean;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_id?: number;
  recipe_id?: number;
};

export type Category = {
  strCategory: string;
};

export type Area = {
  strArea: string;
}
