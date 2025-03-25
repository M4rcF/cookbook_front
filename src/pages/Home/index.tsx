import React from 'react';
import { useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import styles from './styles.module.scss';
import RecipeDetailsModal from "../../components/RecipeDetailsModal/index.tsx";
import Pagination from "../../components/Pagination/index.tsx";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const fakeRecipes = [
    {
      strMeal: "Spaghetti Carbonara",
      strMealThumb: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
      strCategory: "Pasta",
      strArea: "Italian",
      strInstructions: "Cozinhe o macarrão. Frite o bacon. Misture ovos, queijo e pimenta. Combine tudo.",
      ingredients: [
        { name: "Spaghetti", measure: "200g" },
        { name: "Bacon", measure: "100g" },
        { name: "Ovos", measure: "2" },
        { name: "Queijo parmesão", measure: "50g" },
        { name: "Pimenta do reino", measure: "a gosto" }
      ]
    },
    {
      strMeal: "Teriyaki Chicken",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      strCategory: "Chicken",
      strArea: "Japanese",
      strInstructions: "Marinar o frango em molho teriyaki. Grelhar até dourar. Servir com arroz.",
      ingredients: [
        { name: "Frango", measure: "300g" },
        { name: "Molho Teriyaki", measure: "1/2 xícara" },
        { name: "Arroz", measure: "1 xícara" },
      ]
    },
    {
      strMeal: "Feijoada",
      strMealThumb: "https://www.themealdb.com/images/media/meals/c8xgqg1605658919.jpg",
      strCategory: "Stew",
      strArea: "Brazilian",
      strInstructions: "Cozinhe o feijão com as carnes por várias horas. Sirva com arroz, couve e farofa.",
      ingredients: [
        { name: "Feijão preto", measure: "500g" },
        { name: "Linguiça", measure: "200g" },
        { name: "Carne seca", measure: "200g" },
      ]
    },
    {
      strMeal: "Sushi",
      strMealThumb: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
      strCategory: "Seafood",
      strArea: "Japanese",
      strInstructions: "Prepare o arroz, recheie com peixe cru ou legumes e enrole com alga nori.",
      ingredients: [
        { name: "Arroz para sushi", measure: "300g" },
        { name: "Salmão cru", measure: "150g" },
        { name: "Alga nori", measure: "4 folhas" }
      ]
    },
    {
      strMeal: "Chili Con Carne",
      strMealThumb: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
      strCategory: "Beef",
      strArea: "Mexican",
      strInstructions: "Cozinhe a carne moída com feijão, pimentão e temperos picantes.",
      ingredients: [
        { name: "Carne moída", measure: "300g" },
        { name: "Feijão vermelho", measure: "1 lata" },
        { name: "Pimenta chili", measure: "1 colher de sopa" }
      ]
    },
    {
      strMeal: "Moussaka",
      strMealThumb: "https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg",
      strCategory: "Casserole",
      strArea: "Greek",
      strInstructions: "Monte camadas de berinjela, carne moída e molho branco. Leve ao forno.",
      ingredients: [
        { name: "Berinjela", measure: "2" },
        { name: "Carne moída", measure: "250g" },
        { name: "Molho branco", measure: "1 xícara" }
      ]
    },
    {
      strMeal: "Pad Thai",
      strMealThumb: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
      strCategory: "Noodles",
      strArea: "Thai",
      strInstructions: "Frite o macarrão de arroz com legumes, ovo e molho tailandês picante.",
      ingredients: [
        { name: "Macarrão de arroz", measure: "200g" },
        { name: "Ovo", measure: "1" },
        { name: "Molho de peixe", measure: "2 colheres de sopa" }
      ]
    },
    {
      strMeal: "Falafel",
      strMealThumb: "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg",
      strCategory: "Vegetarian",
      strArea: "Middle Eastern",
      strInstructions: "Misture grão-de-bico, temperos e frite bolinhos.",
      ingredients: [
        { name: "Grão-de-bico", measure: "300g" },
        { name: "Coentro", measure: "a gosto" },
        { name: "Cominho", measure: "1 colher de chá" }
      ]
    },
    {
      strMeal: "Hambúrguer Caseiro",
      strMealThumb: "https://www.themealdb.com/images/media/meals/urystu1511387078.jpg",
      strCategory: "Fast Food",
      strArea: "American",
      strInstructions: "Modele hambúrgueres com carne moída e grelhe. Monte com pão, alface e queijo.",
      ingredients: [
        { name: "Carne moída", measure: "300g" },
        { name: "Pão de hambúrguer", measure: "2" },
        { name: "Queijo cheddar", measure: "2 fatias" }
      ]
    },
    {
      strMeal: "Tacos",
      strMealThumb: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
      strCategory: "Street Food",
      strArea: "Mexican",
      strInstructions: "Recheie as tortilhas com carne, legumes e molho picante.",
      ingredients: [
        { name: "Tortilha", measure: "4" },
        { name: "Carne desfiada", measure: "200g" },
        { name: "Molho picante", measure: "a gosto" }
      ]
    }
  ];  

  const paginatedRecipes = fakeRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); 

  return (
    <div className={styles.container}>
      <h2>Receitas Públicas</h2>
      <Pagination
        currentPage={currentPage}
        totalItems={fakeRecipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {fakeRecipes.length === 0 ? (
        <p>Nenhuma receita pública disponível.</p>
      ) : (
        <div className={styles.recipeGrid}>
          {paginatedRecipes.map((recipe: any) => (
            <div key={recipe.strMeal} className={styles.card}>
              <img src={recipe.strMealThumb || "/placeholder.png"} alt={recipe.strMeal} />
              <div className={styles.cardContent}>
                <h3>{recipe.strMeal}</h3>
                <p className={styles.category}>{recipe.strCategory} • {recipe.strArea}</p>
                <button className={styles.expandButton} onClick={() => setSelectedRecipe(recipe)}>
                  <RiInformation2Line size={18} /> Mais detalhes
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
