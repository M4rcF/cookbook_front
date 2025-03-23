import styles from "./styles.module.scss";

export default function RecipeDetailsModal({ recipe, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb || "/placeholder.png"} alt={recipe.strMeal} />
        <p><strong>Categoria:</strong> {recipe.strCategory}</p>
        <p><strong>Origem:</strong> {recipe.strArea}</p>
        <p><strong>Modo de Preparo:</strong></p>
        <p>{recipe.strInstructions}</p>
        <h4>Ingredientes:</h4>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing.measure} {ing.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
