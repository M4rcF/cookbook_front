import React, { useEffect } from 'react';
import { useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import styles from './styles.module.scss';
import Pagination from "../../components/Pagination/index.tsx";
import RecipeService from '../../services/recipeService.ts';
import { FiSearch } from "react-icons/fi";
import useSnackbar from '../../hooks/useSnackbar.ts';

export default function Home() {
  const { showSnackbar } = useSnackbar();
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
      })
      .catch((error) => {
        console.log('error', error)
        showSnackbar(error.response.data.message, 'error');
      });;
  }, [])

  return (
    <div className={styles.container}>
      <h2>Public Recipes</h2>
      <Pagination
        currentPage={currentPage}
        totalItems={recipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {recipes.length === 0 ? (
        <div className={styles.notResult}>
          <FiSearch className={styles.icon} />
          <h3>Sorry! No results found</h3>
          <p>Try again later</p>
        </div>
      ) : (
        <div className={styles.recipeGrid}>
          {paginatedRecipes.map((recipe: any) => (
            <div key={recipe.name} className={styles.card}>
              <img src={recipe.image_url} alt={recipe.name} />
              <div className={styles.cardContent}>
                <h3>{recipe.name}</h3>
                <p className={styles.category}>{recipe.category} • {recipe.origin}</p>
                <a
                  className={styles.detailLink}
                  href={`/recipe/${recipe.id}`}
                >
                  <RiInformation2Line size={18} /> More details
                </a>
                <br/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
