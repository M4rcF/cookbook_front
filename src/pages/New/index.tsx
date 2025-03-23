import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import styles from './styles.module.scss';
import { useForm, Controller } from "react-hook-form";
import { Button, Grid } from '@mui/material';
import InputText from "../../components/InputText/index.tsx";
import Select from "../../components/Select/index.tsx";
import TextArea from "../../components/TextArea/index.tsx";
import MultipleOptions from "../../components/MultipleOptions/index.tsx";

export default function New() {
  const { control, handleSubmit } = useForm();

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => setCategories(res.data.meals.map(c => c.strCategory)));

    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => setAreas(res.data.meals.map(a => a.strArea)));
  }, []);

  const submit = (form: any) => {
    console.log('form', form);
  }

  return (
    <div className={styles.container}>
      <h2>Cadastrar Receita</h2>
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
              name={'recipe_name'}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  label={'Nome da Receita'}
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
              name={'recipe_origin'}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={'Origem (País)'}
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
              name={'recipe_category'}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={'Categoria'}
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
              name={'recipe_img_url'}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  label={'Imagem (URL)'}
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
              name={'recipe_preparation_method'}
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label={'Modo de Preparo'}
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
              name={'recipe_ingredients'}
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
              Cadastrar Receita
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
