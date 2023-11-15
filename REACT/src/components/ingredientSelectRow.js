import React from 'react';


function IngredientSelectRow({ingredient}) {
    return (
        <option value={ingredient.ingredient_id} label={ingredient.name}></option>
    );
  }
  

export default IngredientSelectRow;