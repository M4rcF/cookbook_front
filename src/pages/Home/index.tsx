import React, { useEffect } from 'react';
import { useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import styles from './styles.module.scss';
import RecipeDetailsModal from "../../components/RecipeDetailsModal/index.tsx";
import Pagination from "../../components/Pagination/index.tsx";
import RecipeService from '../../services/recipeService.ts';

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);

  const itemsPerPage = 8;

  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    RecipeService.getAllRecipes()
      .then((resp) => {
        setRecipes(resp.recipes);
      });
  }, [])

  return (
    <div className={styles.container}>
      <h2>Receitas Públicas</h2>
      <Pagination
        currentPage={currentPage}
        totalItems={recipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {recipes.length === 0 ? (
        <p>Nenhuma receita pública disponível.</p>
      ) : (
        <div className={styles.recipeGrid}>
          {paginatedRecipes.map((recipe: any) => (
            <div key={recipe.name} className={styles.card}>
              <img src={recipe.image_url} alt={recipe.name} />
              <div className={styles.cardContent}>
                <h3>{recipe.name}</h3>
                <p className={styles.category}>{recipe.category} • {recipe.origin}</p>
                <button className={styles.expandButton} onClick={() => setSelectedRecipe(recipe)}>
                  <RiInformation2Line size={18} /> Mais detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
