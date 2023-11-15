import {React, useState} from 'react';
import {MdDelete} from 'react-icons/md';
import IngredientSelectRow from '../components/ingredientSelectRow';


function RecipeIngredientRow({row, ingredients, onDelete, onUpdate}) {

    const [calories, setCalories] = useState(parseInt(row.cals_per_100g * row.grams / 100));

    const updateRecipeIngredient = async () => {
        const ingredient = {
            recipe_id: row.recipe_id,
            ingredient_id: row.ingredient_id,
            quantity: row.quantity,
            grams: row.grams
        }

        const response = await fetch(`/recipe_ingredients/${row.recipe_ingredient_id}`, {
            method: 'PUT',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            // console.log(`Successfully edited the ingredient!\n${JSON.stringify(ingredient)}`);
            onUpdate();
        } else {
            console.error(`Failed to edit ingredient, status code = ${response.status}`);
        }
    };

    return (
        <tr>
            <td>
                <select
                    value={row.ingredient_id}
                    label={row.name}
                    onChange={e => {
                        row.ingredient_id = e.target.value;
                        updateRecipeIngredient()}}>
                    {ingredients.map((ingredient, i) => <IngredientSelectRow ingredient={ingredient} key={i} />)}
                </select>
            </td>
            <td>
                <input 
                    type="text"
                    value={row.quantity}
                    onChange={e => {
                        row.quantity = e.target.value;
                        updateRecipeIngredient()}}/>
            </td>
            <td>
                <input 
                    type="number"
                    value={row.grams}
                    onChange={e => {
                        row.grams = e.target.value;
                        setCalories(parseInt(row.cals_per_100g * row.grams / 100))
                        updateRecipeIngredient()}}/>
            </td>
            <td>{calories}</td>
            <td className='row-delete'>
                <span className='tooltip'>
                    {<MdDelete onClick={() => onDelete(row)}/>}
                    <span className='tooltiptext'>Delete</span>
                </span>
            </td>
        </tr>
    );
  }
  

export default RecipeIngredientRow;