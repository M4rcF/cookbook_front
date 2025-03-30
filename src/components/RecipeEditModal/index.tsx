import React from 'react';
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import styles from "./styles.module.scss";
import { Button, FormControlLabel, Grid, Switch } from "@mui/material";
import InputText from "../../components/InputText/index.tsx";
import Select from "../../components/Select/index.tsx";
import TextArea from "../../components/TextArea/index.tsx";
import MultipleOptions from "../../components/MultipleOptions/index.tsx";

export default function RecipeEditModal({ recipe, onClose, onSave }) {
  const { control, handleSubmit, reset, watch } = useForm();

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const submit = (formData) => {
    onSave(formData);
    onClose();
  };

  const isFormInvalid = (data: any) => {
    const {
      name,
      origin,
      category,
      image_url,
      instructions,
      ingredients
    } = data;
  
    const hasBasicFields = name && origin && category && image_url && instructions;
  
    const hasValidIngredients = Array.isArray(ingredients) && ingredients[0] !== '';

    return !(hasBasicFields && hasValidIngredients);
  }

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => setCategories(res.data.meals.map(c => c.strCategory)));

    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => setAreas(res.data.meals.map(a => a.strArea)));
  }, []);

  useEffect(() => {
    console.log('recipe', recipe);

    if (recipe) {
      reset({
        id: recipe.id,
        name: recipe.name,
        origin: recipe.origin,
        category: recipe.category,
        image_url: recipe.image_url,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients,
        public: recipe.public,
      });
    }
  }, [recipe]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Editar Receita</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <Grid container columns={{ xs: 1, sm: 4, md: 4 }} spacing={2}>
            <Grid item xs={1} sm={1} md={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    label="name"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <Controller
                name="origin"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Origin (Country)"
                    options={areas}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    options={categories}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <Controller
                name="image_url"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    label="Image (URL)"
                    required
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={1}
              sm={4}
              md={4}
            >
              <Controller
                name={'public'}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                      />
                    }
                    label="Make recipe public"
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={2}>
              <Controller
                name="instructions"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    label="Modo de Preparo"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={2}>
              <Controller
                name="ingredients"
                control={control}
                render={({ field }) => (
                  <MultipleOptions
                    {...field}
                    label="Ingredientes"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={4} md={4} className={styles.submitButton}>
              <Button
                type="submit"
                variant="contained"
                disabled={isFormInvalid(watch())}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
