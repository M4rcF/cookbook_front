import { Recipe, Review } from "../@types/model";
import api from "./api";

const RecipeService = {
  getAllRecipes: async () => {
    const response = await api.get("/api/recipes");
    return response.data;
  },

  getRecipe: async (recipeId: number) => {
    const response = await api.get(`/api/recipes/${recipeId}`);
    return response.data;
  },

  createRecipe: async (data: Recipe) => {
    const response = await api.post("/api/recipes", data);
    return response.data;
  },

  updateRecipe: async (data: Recipe) => {
    const response = await api.put(`/api/recipes/${data.id}`, data);
    return response.data;
  },

  deleteRecipe: async (id: number) => {
    const response = await api.delete(`/api/recipes/${id}`);
    return response.data;
  },

  getRecipesUser: async () => {
    const response = await api.get("/api/recipes/user");
    return response.data;
  },

  getReviews: async (recipeId: number) => {
    const response = await api.get(`/api/reviews?recipe_id=${recipeId}`);
    return response.data;
  },

  createReview: async (data: Review) => {
    const response = await api.post("/api/reviews", data);
    return response.data;
  },

  updateReview: async (reviewId: number, data: Review) => {
    const response = await api.put(`/api/reviews/${reviewId}`, data);
    return response.data;
  },

  deleteReview: async (reviewId: number) => {
    const response = await api.delete(`/api/reviews/${reviewId}`);
    return response.data;
  },
};

export default RecipeService;
