import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import RecipeEditModal from '../../components/RecipeEditModal/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { RiEdit2Line, RiInformation2Line } from 'react-icons/ri';
import { MdDeleteOutline } from 'react-icons/md';
import { Grid, Button, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import RecipeService from '../../services/recipeService.ts';
import useSnackbar from '../../hooks/useSnackbar.ts';
import RecipeDetailsModal from '../../components/RecipeDetailsModal/index.tsx';

export default function RecipeList() {
  const { showSnackbar } = useSnackbar();
  const [recipe, setRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const itemsPerPage = 6;
  const paginatedRecipes = recipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getRecipesList = () => {
    RecipeService.getRecipesUser()
      .then((resp) => {
        setRecipes(resp.recipes);
      })
      .catch((error) => {
        showSnackbar('Erro ao carregar receitas.', 'error');
      });
  };

  const editRecipe = (recipeToEdit) => {
    RecipeService.updateRecipe(recipeToEdit)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
        getRecipesList();
      })
      .catch((error) => {
        showSnackbar(error.data.message, 'error');
      });
  };

  const deleteRecipe = (id) => {
    RecipeService.deleteRecipe(id)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
        getRecipesList();
      })
      .catch(() => {
        showSnackbar('Erro ao excluir receita.', 'error');
      });
  };

  useEffect(() => {
    getRecipesList();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Minhas Receitas</h2>

      <Pagination
        currentPage={currentPage}
        totalItems={recipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Grid container spacing={2} className={styles.cards}>
        {paginatedRecipes.map((recipe: any, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card className={styles.card}>
              <CardMedia component="img" height="180" image={recipe.image_url} alt={recipe.name} />
              <CardContent className={styles.cardContent}>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2" color="textSecondary" className={styles.category}>
                  {recipe.category} • {recipe.origin}
                </Typography>
              </CardContent>
              <CardActions className={styles.cardButtons}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setSelectedRecipe(recipe)}
                  startIcon={<RiInformation2Line />}
                >
                  Detalhes
                </Button>
                <div className={styles.actionButtons}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setRecipe(recipe)}
                    startIcon={<RiEdit2Line />}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => deleteRecipe(recipe.id)}
                    startIcon={<MdDeleteOutline />}
                  >
                    Excluir
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedRecipe && <RecipeDetailsModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      {recipe && <RecipeEditModal recipe={recipe} onClose={() => setRecipe(null)} onSave={(e) => editRecipe(e)} />}
    </div>
  );
}
