import { motion } from "framer-motion";
import styles from "./styles.module.scss";

export default function RecipeDetailsModal({ recipe, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.imageContainer}>
          <img src={recipe.image_url} alt={recipe.name} />
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h2>{recipe.name}</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>

          <p><strong>Categoria:</strong> {recipe.category}</p>
          <p><strong>Origem:</strong> {recipe.origin}</p>

          <p><strong>Modo de preparo:</strong></p>
          <p>{recipe.instructions}</p>

          <h4>Ingredientes:</h4>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
