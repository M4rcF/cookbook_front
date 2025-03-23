import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";

export default function RecipeFormModal({ recipe, type, onClose, onSave }) {
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(res => setCategories(res.data.meals.map(c => c.strCategory)));

    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => setAreas(res.data.meals.map(a => a.strArea)));
  }, []);

  const handleChange = (e) => {
    setEditedRecipe({ ...editedRecipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...editedRecipe.ingredients];
    updatedIngredients[index][field] = value;
    setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setEditedRecipe({
      ...editedRecipe,
      ingredients: [...editedRecipe.ingredients, { name: "", measure: "" }]
    });
  };

  const removeIngredient = (index) => {
    if (editedRecipe.ingredients.length > 1) {
      setEditedRecipe({
        ...editedRecipe,
        ingredients: editedRecipe.ingredients.filter((_, i) => i !== index)
      });
    }
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
            <select name="strCategory" value={editedRecipe.strCategory} onChange={handleChange}>
              <option value="">Selecione</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <label>Origem:</label>
            <select name="strArea" value={editedRecipe.strArea} onChange={handleChange}>
              <option value="">Selecione</option>
              {areas.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>

            <label>Modo de Preparo:</label>
            <textarea name="strInstructions" value={editedRecipe.strInstructions} onChange={handleChange} />

            <h3>Ingredientes</h3>
            {editedRecipe.ingredients.map((ing, index) => (
              <div key={index} className={styles.ingredientRow}>
                <input
                  type="text"
                  placeholder="Ingrediente"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Quantidade"
                  value={ing.measure}
                  onChange={(e) => handleIngredientChange(index, "measure", e.target.value)}
                />
                {editedRecipe.ingredients.length > 1 && (
                  <button type="button" className={styles.removeButton} onClick={() => removeIngredient(index)}>
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={addIngredient}>+ Adicionar Ingrediente</button>

            <button onClick={handleSave}>Salvar Alterações</button>
          </>
        )}
      </div>
    </div>
  );
}
