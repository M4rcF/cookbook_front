import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

type MultipleOptionsProps = {
  label?: string;
  required?: boolean;
  value?: string[];
  onChange?: (ingredients: string[]) => void;
};

export default function MultipleOptions({
  value = [""],
  onChange,
  label,
  required,
}: MultipleOptionsProps) {
  const ingredients = value.length > 0 ? value : [""];

  const addIngredient = () => {
    onChange?.([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const updated = ingredients.filter((_, i) => i !== index);
      onChange?.(updated);
    }
  };

  const handleChange = (index: number, val: string) => {
    const updated = [...ingredients];
    updated[index] = val;
    onChange?.(updated);
  };

  return (
    <div className={styles.container}>
      <label>
        {label} {required && "*"}
      </label>
      {ingredients.map((item, index) => (
        <div key={index} className={styles.ingredientRow}>
          <input
            type="text"
            placeholder="Ex: 200g de arroz"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {ingredients.length > 1 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeIngredient(index)}
            >
              Remover
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="outlined"
        onClick={addIngredient}
        className={styles.addButton}
      >
        Adicionar Ingrediente
      </Button>
    </div>
  );
}
