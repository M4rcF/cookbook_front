import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import RecipeService from "../../services/recipeService.ts";
import OtherReviews from "./OtherReivews/index.tsx";
import TextArea from "../TextArea/index.tsx";
import styles from "./styles.module.scss";
import useSnackbar from "../../hooks/useSnackbar.ts";

export type Recipe = {
  id: number;
  name: string;
  image_url: string;
  category: string;
  origin: string;
  instructions: string;
  ingredients: string[];
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_id?: number;
};

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isEditingReview, setIsEditingReview] = useState(false);

  const { showSnackbar } = useSnackbar();

  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rating: userReview ? userReview.rating : 0,
      comment: userReview ? userReview.comment : "",
    },
  });

  useEffect(() => {
    if (!isEditingReview) {
      reset({
        rating: userReview ? userReview.rating : 0,
        comment: userReview ? userReview.comment : "",
      });
    }
  }, [userReview, reset, isEditingReview]);

  useEffect(() => {
    const recipeId = Number(id);
    RecipeService.getRecipe(recipeId)
      .then((data: Recipe) => {
        setRecipe(data);
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });

    RecipeService.getReviews(recipeId)
      .then((data: { reviews: Review[] }) => {
        setReviews(data.reviews);
        const existing = data.reviews.find((r) => r.user_id === user.id);
        if (existing) {
          setUserReview(existing);
        }
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, 'error');
      });
  }, [id]);

  const onReviewSubmit = (form: any) => {
    const data = { ...form, recipe_id: Number(id) }

    console.log('data', data);

    if (userReview) {
      RecipeService.updateReview(userReview.id, data)
        .then((resp) => {
          showSnackbar(resp.message, 'success');
          setIsEditingReview(false);
          setUserReview(resp.review);
        })
        .catch((error) => {
          showSnackbar(error.response.data.message, 'error');
        });
    } else {
      RecipeService.createReview(data)
        .then((resp) => {
          showSnackbar(resp.message, 'success');
          setUserReview(resp.review);
        })
        .catch((error) => {
          showSnackbar(error.response.data.message, 'error');
        });
    }
  };

  const handleReviewDelete = () => {
    if (userReview) {
      RecipeService.deleteReview(userReview.id)
        .then((resp) => {
          setUserReview(null);
          setIsEditingReview(false);
          showSnackbar(resp.message, 'success');
        })
        .catch((error) => {
          showSnackbar(error.response.data.message, 'error');
        });
    }
  };

  return (
    <div className={styles.container}>
      {recipe ? (
        <>
          <Grid container spacing={2} className={styles.recipeDetails}>
            <Grid item xs={12} md={4}>
              <img src={recipe.image_url} alt={recipe.name} className={styles.recipeImage} />
            </Grid>
            <Grid item xs={12} md={8} className={styles.recipeInfo}>
              <h2>{recipe.name}</h2>
              <p className={styles.meta}>
                {recipe.category} • {recipe.origin}
              </p>
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
              <h3>Ingredients</h3>
              <ul className={styles.ingredientsList}>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
              <div className={styles.userReviewSection}>
                {userReview && !isEditingReview ? (
                  <div className={styles.userReview}>
                    <p><strong>Your Review:</strong></p>
                    <p>Rating: {userReview.rating} ⭐</p>
                    <p>Comment: <br/>{userReview.comment}</p>
                    <p>
                      {`Created: ${new Date(userReview.created_at).toLocaleDateString()} - Updated: ${new Date(userReview.updated_at).toLocaleDateString()}`}
                    </p>
                    <div className={styles.reviewButtons}>
                      <Button variant="contained" onClick={() => setIsEditingReview(true)}>
                        Edit Comment
                      </Button>
                      <Button variant="outlined" color="error" onClick={handleReviewDelete}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onReviewSubmit)} className={styles.reviewForm}>
                    <h3>{userReview ? "Edit Your Review" : "Add Your Review"}</h3>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{ required: "Rating is required" }}
                      defaultValue={userReview ? userReview.rating : 0}
                      render={({ field }) => (
                        <Rating
                          {...field}
                          onChange={(_, newValue) => field.onChange(newValue || 0)}
                          max={5}
                        />
                      )}
                    />
                    <Controller
                      name="comment"
                      control={control}
                      defaultValue={userReview ? userReview.comment : ""}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          label={''}
                          maxLength={200}
                        />
                      )}
                    />
                    <div className={styles.formActions}>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => {
                          setIsEditingReview(false);
                          if (!userReview) {
                            reset({ rating: 0, comment: "" });
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        {userReview ? "Edit" : "Submit"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Grid>
          </Grid>
          <OtherReviews
            reviews={reviews.filter((r) => r.user_id !== user.id)}
          />
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
}
