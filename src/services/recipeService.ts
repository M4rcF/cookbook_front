import api from "./api.ts";

const RecipeService = {
  getAllRecipes: async () => {
    const response = await api.get("/api/recipes");
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
    const response = await api.get('/api/recipes/user');
    return response.data;
  },
};

export default RecipeService;
