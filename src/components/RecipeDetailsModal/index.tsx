import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { Recipe } from "../../@types/model";

type RecipeDetailsModalProps = {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeDetailsModal(props: RecipeDetailsModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.imageContainer}>
          <img src={props.recipe.image_url} alt={props.recipe.name} />
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h2>{props.recipe.name}</h2>
            <button className={styles.closeButton} onClick={props.onClose}>×</button>
          </div>

          <p><strong>Category:</strong> {props.recipe.category}</p>
          <p><strong>Origin:</strong> {props.recipe.origin}</p>

          <p><strong>Instructions:</strong></p>
          <p>{props.recipe.instructions}</p>

          <h4>Ingredients:</h4>
          <ul>
            {props.recipe.ingredients.map((ing: string, index: number) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
