import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./styles.module.scss";
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import InputText from '../../components/InputText/index.tsx';
import Select from '../../components/Select/index.tsx';

export default function Search() {
  const { control, handleSubmit } = useForm();

  const [results, setResults] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const submit = async (form: any) => {
    try {
      let meals: any = [];

      if (form.name) {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${form.name}`);
        meals = res.data.meals || [];
      }

      const filtered = meals.filter((meal) => {
        console.log('origin', form.origin);
        console.log('strArea', meal.strArea);
        console.log('category', form.category);

        const matchCategory = form.category !== undefined ? meal.strCategory === form.category : true;
        const matchArea = form.origin !== undefined ? meal.strArea === form.area : true;
        return matchCategory && matchArea;
      });


      setResults(filtered);
    } catch {

    }
  }

  const getIngredients = (meal) => {
    const ingredients: any = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim() !== "") {
        ingredients.push(`${measure || ""} ${name}`.trim());
      }
    }
    return ingredients;
  };

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => setCategories(res.data.meals.map(c => c.strCategory)));

    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => setAreas(res.data.meals.map(a => a.strArea)));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Procurar Receita</h2>
      <form onSubmit={handleSubmit(submit)}>
        <Grid
          container
          columns={{ xs: 1, sm: 4, md: 4 }}
          spacing={2}
        >
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
          >
            <Controller
              name={'name'}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  label={'Nome da Receita'}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
          >
            <Controller
              name={'ingredient'}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  label={'Ingrediente'}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
          >
            <Controller
              name={'origin'}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={'Origem (País)'}
                  options={areas}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
          >
            <Controller
              name={'category'}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={'Categoria'}
                  options={categories}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sm={4}
            md={4}
            className={styles.submitButton}
          >
            <Button
              type="submit"
              variant="contained"
              className={styles.submitButton}
            >
              Pesquisar
            </Button>
          </Grid>
        </Grid>
      </form>
      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((meal) => (
            <>
              <div key={meal.idMeal} className={styles.informations}>
                {meal.strMealThumb && (
                  <img src={meal.strMealThumb} alt={meal.strMeal} width={100} height={200}/>
                )}
                <div>
                  <p><strong>Nome:</strong> {meal.strMeal}</p>
                  <p><strong>Categoria:</strong> {meal.strCategory}</p>
                  <p><strong>Origem:</strong> {meal.strArea}</p>
                  <p><strong>Modo de preparo:</strong></p>
                  <p>{meal.strInstructions}</p>
                  <h4>Ingredientes:</h4>
                  <ul>
                    {getIngredients(meal).map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
