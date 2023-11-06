import React from 'react';
import RecipeIngredientRow from './RecipeIngredientRow';
import {MdAdd} from 'react-icons/md';


function RecipeIngredientTable({recipeIngredients, onEdit, onDelete, onCreate, recipe_id}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Quantity (Imperial)</th><th>Quantity (g)</th><th>Calories</th>
                </tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRow row={row} onEdit={onEdit} onDelete={onDelete} key={i} />)}
                <tr className='table-add'>
                    <div className='tooltip'>
                        {<MdAdd onClick={() => onCreate(recipe_id)}/>}
                        <span className='tooltiptext'>Add Ingredient</span>
                    </div>
                </tr>
            </tbody>
        </table>
    );
  }
  

export default RecipeIngredientTable;