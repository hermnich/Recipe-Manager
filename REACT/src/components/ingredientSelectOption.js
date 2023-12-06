import React from 'react';


export default function IngredientSelectOption({ingredient}) {
  return (
    <option value={ingredient.ingredient_id} label={ingredient.name}></option>
  );
}
