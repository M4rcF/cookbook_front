import api from "./api.ts";

const RecipeService = {
  getAllRecipes: async () => {
    const response = await api.get("/api/recipes");
    return response.data;
  },

  getRecipe: async (recipeId: number) => {
    const response = await api.get(`/api/recipes/${recipeId}`);
    return response.data;
  },

  createRecipe: async (data: any) => {
    const response = await api.post("/api/recipes", data);
    return response.data;
  },

  updateRecipe: async (data: any) => {
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

  // Métodos para reviews

  // Busca todas as reviews para uma receita específica.
  // Aqui, assumimos que o backend suporta um parâmetro de query 'recipe_id'
  getReviews: async (recipeId: number) => {
    const response = await api.get(`/api/reviews?recipe_id=${recipeId}`);
    return response.data;
  },

  // Cria uma nova review
  createReview: async (data: any) => {
    const response = await api.post("/api/reviews", data);
    return response.data;
  },

  // Atualiza uma review existente
  updateReview: async (reviewId: number, data: any) => {
    const response = await api.put(`/api/reviews/${reviewId}`, data);
    return response.data;
  },

  // Deleta uma review
  deleteReview: async (reviewId: number) => {
    const response = await api.delete(`/api/reviews/${reviewId}`);
    return response.data;
  },
};

export default RecipeService;
