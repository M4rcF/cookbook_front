import { useState } from "react";
import styles from "./styles.module.scss";

export default function RecipeModal({ recipe, type, onClose, onSave }) {
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleChange = (e) => {
    setEditedRecipe({ ...editedRecipe, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedRecipe);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        {type === "comments" ? (
          <>
            <h2>Comentários sobre {recipe.strMeal}</h2>
            <ul className={styles.commentsList}>
              <li>Ótima receita! 😋</li>
              <li>Fiz e adorei!</li>
              <li>Melhor prato que já preparei!</li>
            </ul>
          </>
        ) : (
          <>
            <h2>Editar Receita</h2>
            <label>Nome da Receita:</label>
            <input type="text" name="strMeal" value={editedRecipe.strMeal} onChange={handleChange} />

            <label>Categoria:</label>
            <input type="text" name="strCategory" value={editedRecipe.strCategory} onChange={handleChange} />

            <label>Origem:</label>
            <input type="text" name="strArea" value={editedRecipe.strArea} onChange={handleChange} />

            <label>Modo de Preparo:</label>
            <textarea name="strInstructions" value={editedRecipe.strInstructions} onChange={handleChange} />

            <button onClick={handleSave}>Salvar Alterações</button>
          </>
        )}
      </div>
    </div>
  );
}
