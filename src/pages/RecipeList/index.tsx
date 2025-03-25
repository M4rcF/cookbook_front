import React from 'react';
import { useState } from "react";
import styles from "./styles.module.scss";
import RecipeDetailsModal from "../../components/RecipeDetailsModal/index.tsx";
import RecipeEditModal from "../../components/RecipeEditModal/index.tsx";
import Pagination from "../../components/Pagination/index.tsx";
import { RiInformation2Line, RiEdit2Line } from "react-icons/ri";
import { Grid, Button } from "@mui/material";

// Simulação de receitas do usuário logado
const fakeUserRecipes = [
  {
    strMeal: "Bolo de Cenoura",
    strMealThumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    strCategory: "Dessert",
    strArea: "Brazilian",
    strInstructions: "Misture cenoura, ovos, óleo, depois adicione farinha, açúcar e fermento. Asse por 40 min.",
    ingredients: [
      { name: "Cenoura", measure: "2" },
      { name: "Ovo", measure: "3" },
      { name: "Óleo", measure: "1/2 xícara" },
      { name: "Farinha", measure: "2 xícaras" },
      { name: "Açúcar", measure: "1 xícara" },
      { name: "Fermento", measure: "1 colher de sopa" }
    ]
  },
  // ...outras receitas
];

export default function RecipeList() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editRecipe, setEditRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedRecipes = fakeUserRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <h2>Minhas Receitas</h2>

      <Grid container spacing={2}>
        {paginatedRecipes.map((recipe, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <div className={styles.card}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className={styles.cardContent}>
                <h3>{recipe.strMeal}</h3>
                <p className={styles.category}>{recipe.strCategory} • {recipe.strArea}</p>
                <div className={styles.cardButtons}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedRecipe(recipe)}
                    startIcon={<RiInformation2Line />}
                  >
                    Detalhes
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setEditRecipe(recipe)}
                    startIcon={<RiEdit2Line />}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <Pagination
        currentPage={currentPage}
        totalItems={fakeUserRecipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {selectedRecipe && (
        <RecipeDetailsModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

      {editRecipe && (
        <RecipeEditModal recipe={editRecipe} onClose={() => setEditRecipe(null)} onSave={() => {}} />
      )}
    </div>
  );
}
