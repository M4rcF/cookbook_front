import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '@mui/material';

type Ingredient = {
  name: string;
  measure: string;
};

type MultipleOptionsProps = {
  label?: string;
  required?: boolean;
  onChange?: (ingredients: Ingredient[]) => void;
};

export default function MultipleOptions(props: MultipleOptionsProps) {
  const [options, setOptions] = useState<Ingredient[]>([
    { name: "", measure: "" },
  ]);

  const addIngredient = () => {
    const newOptions = [...options, { name: "", measure: "" }];
    setOptions(newOptions);
    props.onChange?.(newOptions);
  };

  const removeIngredient = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      props.onChange?.(newOptions);
    }
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
    props.onChange?.(newOptions);
  };

  return (
    <div className={styles.container}>
      <label>{props.label} {props.required && "*"}</label>
      {options.map((ing, index) => (
        <div key={index} className={styles.ingredientRow}>
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={ing.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Quantidade"
              value={ing.measure}
              onChange={(e) => handleIngredientChange(index, "measure", e.target.value)}
            />
          </div>
          {options.length > 1 && (
            <Button
              variant="outlined"
              onClick={() => removeIngredient(index)}
              color="error"
            >
                Remover Ingrediente
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
