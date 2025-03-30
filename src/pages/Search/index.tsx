import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import InputText from '../../components/InputText/index.tsx';
import Select from '../../components/Select/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import useSnackbar from "../../hooks/useSnackbar.ts";
import RecipeService from '../../services/recipeService.ts';
import RecipeDetailsModal from '../../components/RecipeDetailsModal/index.tsx';

export default function Search() {
  const { control, handleSubmit } = useForm();
  const { showSnackbar } = useSnackbar();

  const [results, setResults] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const itemsPerPage = 8;

  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => setCategories(res.data.meals.map(c => c.strCategory)));
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => setAreas(res.data.meals.map(a => a.strArea)));
  }, []);

  const getMealDetails = async (id: string) => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const meal = res.data.meals?.[0];
    if (meal) {
      return {
        name: meal.strMeal,
        category: meal.strCategory,
        origin: meal.strArea,
        instructions: meal.strInstructions,
        ingredients: getIngredients(meal),
        image_url: meal.strMealThumb
      };
    }
    return;
  };

  const getIngredients = (meal: any) => {
    const ingredients: any[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim() !== "") {
        ingredients.push(`${measure || ""} ${name}`.trim());
      }
    }
    return ingredients;
  };

  const importRecipe = async (id: string) => {
    const meal = await getMealDetails(id);
    if (!meal) return;

    RecipeService.createRecipe(meal)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error")
      });
  };

  const submit = async (form: any) => {
    try {
      let meals: any[] = [];

      if (form.name) {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${form.name}`);
        meals = res.data.meals || [];
      } else if (form.ingredient) {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${form.ingredient}`);
        meals = res.data.meals || [];
      } else if (form.category) {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${form.category}`);
        meals = res.data.meals || [];
      } else if (form.origin) {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${form.origin}`);
        meals = res.data.meals || [];
      }

      setResults(meals);
    } catch (err) {
      console.error("Error fetching meals", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Search Recipe</h2>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <InputText {...field} label="Name" />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="ingredient"
              control={control}
              render={({ field }) => <InputText {...field} label="Ingredient" />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="origin"
              control={control}
              render={({ field }) => <Select {...field} label="Origin (Country)" options={areas} />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => <Select {...field} label="Category" options={categories} />}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type="submit" variant="contained">Search</Button>
          </Grid>
        </Grid>
      </form>

      <Pagination
        currentPage={currentPage}
        totalItems={results.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {results.length > 0 ? (
        <Grid container spacing={2} className={styles.gridResults}>
          {paginatedResults.map((meal) => (
            <Grid item xs={12} sm={6} md={3} key={meal.idMeal}>
              <div className={styles.card}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h4>{meal.strMeal}</h4>
                <div className={styles.buttons}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => getMealDetails(meal.idMeal).then((m: any) => setSelectedRecipe(m))}
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => importRecipe(meal.idMeal)}
                  >
                    Import
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={styles.notResult}>
          <FiSearch className={styles.icon} />
          <h3>Sorry! No results found</h3>
          <p>We couldn't find any recipes. Try searching with different keywords.</p>
        </div>
      )}
      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(undefined)}
        />
      )}
    </div>
  );
}
