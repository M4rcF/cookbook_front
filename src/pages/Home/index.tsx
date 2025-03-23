import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./styles.module.scss";
import RecipeDetailsModal from "../../components/RecipeDetailsModal/index.tsx";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
    const storedPrivacy = JSON.parse(localStorage.getItem("recipePrivacy")) || {};

    // Filtra apenas receitas públicas
    const publicRecipes = storedRecipes.filter(recipe => storedPrivacy[recipe.strMeal] !== false);
    setRecipes(publicRecipes);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Receitas Públicas</h1>
      {recipes.length === 0 ? (
        <p className={styles.empty}>Nenhuma receita pública disponível.</p>
      ) : (
        <div className={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <div key={recipe.strMeal} className={styles.card}>
              <img src={recipe.strMealThumb || "/placeholder.png"} alt={recipe.strMeal} />
              <div className={styles.cardContent}>
                <h3>{recipe.strMeal}</h3>
                <p className={styles.category}>{recipe.strCategory} • {recipe.strArea}</p>
                <button className={styles.expandButton} onClick={() => setSelectedRecipe(recipe)}>
                  <FaInfoCircle size={18} /> Mais detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetailsModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}
