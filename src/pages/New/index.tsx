import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import styles from './styles.module.scss';
import { useForm, Controller } from "react-hook-form";
import { Button, FormControlLabel, Grid, Switch } from '@mui/material';
import InputText from "../../components/InputText/index.tsx";
import Select from "../../components/Select/index.tsx";
import TextArea from "../../components/TextArea/index.tsx";
import MultipleOptions from "../../components/MultipleOptions/index.tsx";
import RecipeService from "../../services/recipeService.ts";
import useSnackbar from "../../hooks/useSnackbar.ts";

export default function New() {
  const { showSnackbar } = useSnackbar();
  const { control, handleSubmit, reset, watch } = useForm();

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const submit = (form: any) => {
    RecipeService.createRecipe(form)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
        reset({
          name: '',
          origin: '',
          category: '',
          image_url: '',
          public: false,
          instructions: ''
        });
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  }

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

  return (
    <div className={styles.container}>
      <h2>Register Recipe</h2>
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
                  label={'Name'}
                  required
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
                  label={'Origin (Country)'}
                  options={areas}
                  required
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
                  label={'Category'}
                  options={categories}
                  required
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
              name={'image_url'}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  label={'Image (URL)'}
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
          <Grid
            item
            xs={1}
            sm={2}
            md={2}
          >
            <Controller
              name={'instructions'}
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label={'Instructions'}
                  required
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sm={2}
            md={2}
          >
            <Controller
              name={'ingredients'}
              control={control}
              render={({ field }) => (
                <MultipleOptions
                  {...field}
                  label="Ingredients"
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
            className={styles.submitButton}
          >
            <Button
              type="submit"
              variant="contained"
              className={styles.submitButton}
              disabled={isFormInvalid(watch())}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
