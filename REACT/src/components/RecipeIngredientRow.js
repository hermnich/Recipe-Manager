import {React, useState} from 'react';
import {MdDelete} from 'react-icons/md';
import IngredientSelectOption from '../components/ingredientSelectOption';
import * as RecipeIngredients from '../modules/RecipeIngredients'


export default function RecipeIngredientRow({row, ingredients, onUpdate, onDelete}) {
    return (
        <tr>
            <td>
                <select value={row.ingredient_id} label={row.name}
                    onChange={e => {RecipeIngredients.updateID(row.recipe_ingredient_id, {ingredient_id: e.target.value}, onUpdate)}}>
                    {ingredients.map((ingredient, i) => <IngredientSelectOption ingredient={ingredient} key={i} />)}
                </select>
            </td>
            <td className='data-input table'>
                <input type='text' value={row.quantity_text} placeholder='1 Cup'
                    onChange={e => {RecipeIngredients.updateID(row.recipe_ingredient_id, {quantity_text: e.target.value}, onUpdate)}}/> (
                <input type='number' value={row.quantity}
                    onChange={e => {RecipeIngredients.updateID(row.recipe_ingredient_id, {quantity: e.target.value}, onUpdate)}}/>g)
            </td>
            <td>{parseInt(row.calories * row.quantity / 100)}</td>
            <td>
                <MdDelete className='btn btn-table tooltip' onClick={() => onDelete(row, onUpdate)}/>
                <span className='tooltip-text'>Delete</span>
            </td>
        </tr>
    );
}
