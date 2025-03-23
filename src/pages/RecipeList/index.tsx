import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import RecipeFormModal from "../../components/RecipeFormModal/index.tsx";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
    const storedPrivacy = JSON.parse(localStorage.getItem("recipePrivacy")) || {};

    const updatedRecipes = storedRecipes.map(recipe => ({
      ...recipe,
      isPublic: storedPrivacy[recipe.strMeal] ?? true,
    }));

    setRecipes(updatedRecipes);
  }, []);

  const togglePrivacy = (recipeName) => {
    setRecipes(prevRecipes => {
      const updatedRecipes = prevRecipes.map(recipe =>
        recipe.strMeal === recipeName ? { ...recipe, isPublic: !recipe.isPublic } : recipe
      );

      const updatedPrivacy = updatedRecipes.reduce((acc, recipe) => {
        acc[recipe.strMeal] = recipe.isPublic;
        return acc;
      }, {});
      localStorage.setItem("recipePrivacy", JSON.stringify(updatedPrivacy));

      return updatedRecipes;
    });
  };

  const openCommentsModal = (recipe) => {
    setSelectedRecipe(recipe);
    setCommentsModalOpen(true);
  };

  const openEditModal = (recipe) => {
    setSelectedRecipe(recipe);
    setEditModalOpen(true);
  };

  const saveEditedRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map(r => 
      r.strMeal === updatedRecipe.strMeal ? updatedRecipe : r
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className={styles.container}>
      <h1>Minhas Receitas</h1>
      {recipes.length === 0 ? (
        <p className={styles.empty}>Nenhuma receita cadastrada.</p>
      ) : (
        <table className={styles.recipeTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Origem</th>
              <th>Privacidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.strMeal}</td>
                <td>{recipe.strCategory}</td>
                <td>{recipe.strArea}</td>
                <td>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={recipe.isPublic}
                      onChange={() => togglePrivacy(recipe.strMeal)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </td>
                <td>
                  <button onClick={() => openCommentsModal(recipe)}>Ver Comentários</button>
                  <button onClick={() => openEditModal(recipe)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {commentsModalOpen && (
        <RecipeFormModal
          recipe={selectedRecipe}
          type="comments"
          onClose={() => setCommentsModalOpen(false)}
        />
      )}

      {editModalOpen && (
        <RecipeFormModal
          recipe={selectedRecipe}
          type="edit"
          onClose={() => setEditModalOpen(false)}
          onSave={saveEditedRecipe}
        />
      )}
    </div>
  );
}
