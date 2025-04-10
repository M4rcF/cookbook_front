import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import RecipeEditModal from '../../components/RecipeEditModal/index';
import Pagination from '../../components/Pagination/index';
import { RiEdit2Line, RiInformation2Line } from 'react-icons/ri';
import { MdDeleteOutline } from 'react-icons/md';
import { Grid, Button } from '@mui/material';
import RecipeService from '../../services/recipeService';
import useSnackbar from '../../hooks/useSnackbar';
import { FiSearch } from 'react-icons/fi';
import { Recipe } from '../../@types/model';

export default function RecipeList() {
  const { showSnackbar } = useSnackbar();
  const [recipe, setRecipe] = useState<Recipe>();
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const itemsPerPage = 6;
  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRecipesList = () => {
    RecipeService.getRecipesUser()
      .then((resp) => {
        setRecipes(resp.recipes);
      })
      .catch((error) => {
        console.log('error', error)
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const editRecipe = (recipeToEdit: Recipe) => {
    RecipeService.updateRecipe(recipeToEdit)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
        getRecipesList();
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  const deleteRecipe = (id: number) => {
    RecipeService.deleteRecipe(id)
      .then((resp) => {
        showSnackbar(resp.message, 'success');
        getRecipesList();
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  };

  useEffect(() => {
    getRecipesList();
  }, []);

  return (
    <div className={styles.container}>
      <h2>My Recipes</h2>

      <Pagination
        currentPage={currentPage}
        totalItems={recipes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Grid container spacing={2} className={styles.cards}>
        {paginatedRecipes.map((recipe: Recipe, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <div className={styles.card}>
              <div className={styles.cardImageContainer}>
                <img src={recipe.image_url} alt={recipe.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3>{recipe.name}</h3>
                <p className={styles.category}>{recipe.category} • {recipe.origin}</p>
              </div>
              <div className={styles.cardActions}>
                <a href={`/recipe/${recipe.id}`} className={styles.detailLink}>
                  <RiInformation2Line size={18} /> More details
                </a>
                <div className={styles.actionButtons}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setRecipe(recipe)}
                    startIcon={<RiEdit2Line />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => deleteRecipe(recipe.id)}
                    startIcon={<MdDeleteOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {recipes.length === 0 && (
        <div className={styles.notResult}>
          <FiSearch className={styles.icon} />
          <h3>Sorry! No results found</h3>
          <p>Try registering a recipe</p>
        </div>
      )}
      {recipe && (
        <RecipeEditModal
          recipe={recipe}
          onClose={() => setRecipe(undefined)}
          onSave={(e: Recipe) => editRecipe(e)}
        />
      )}
    </div>
  );
}
