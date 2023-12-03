import {React, useState} from 'react';
import {MdDelete} from 'react-icons/md';
import IngredientSelectOption from '../components/ingredientSelectOption';
import * as RecipeIngredients from '../modules/RecipeIngredients'


export default function RecipeIngredientRow({row, ingredients, onUpdate, onDelete}) {

    const [calories, setCalories] = useState(parseInt(row.calories * row.quantity / 100));

    return (
        <tr>
            <td>
                <select value={row.ingredient_id} label={row.name}
                    onChange={e => {
                        row.ingredient_id = e.target.value;
                        RecipeIngredients.updateID(row)}}>
                    {ingredients.map((ingredient, i) => <IngredientSelectOption ingredient={ingredient} key={i} />)}
                </select>
            </td>
            <td>
                <input type="text" value={row.quantity_text}
                    onChange={e => {
                        row.quantity = e.target.value;
                        RecipeIngredients.updateID(row)}}/>
            </td>
            <td>
                <input type="number" value={row.quantity}
                    onChange={e => {
                        row.grams = e.target.value;
                        setCalories(parseInt(row.calories * row.quantity / 100))
                        RecipeIngredients.updateID(row)}}/>
            </td>
            <td>{calories}</td>
            <td>
                <MdDelete className='btn btn-table tooltip' onClick={() => onDelete(row, onUpdate)}/>
                <span className='tooltip-text'>Delete</span>
            </td>
        </tr>
    );
}
