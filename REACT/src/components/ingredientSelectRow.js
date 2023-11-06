import React from 'react';


function IngredientSelectRow({row}) {
    return (
        <option value={row.ingredient_id} label={row.name}></option>
    );
  }
  

export default IngredientSelectRow;