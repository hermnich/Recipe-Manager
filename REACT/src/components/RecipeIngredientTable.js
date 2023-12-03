import {React, useState, useEffect} from 'react';
import RecipeIngredientRow from './RecipeIngredientRow';
import * as Ingredients from '../modules/Ingredients'
import {MdAdd} from 'react-icons/md';


export default function RecipeIngredientTable({recipeIngredients, onCreate, onUpdate, onDelete}) {
    
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        Ingredients.load(setIngredients);
    }, []);

    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Quantity (Imperial)</th><th>Quantity (g)</th><th>Calories</th></tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRow row={row} ingredients={ingredients} onUpdate={onUpdate} onDelete={onDelete} key={i} />)}
                <tr>
                    <td className='table-add' colSpan='5'>
                        <MdAdd className='btn btn-table tooltip' onClick={() => {onCreate(onUpdate)}}/>
                        <span className='tooltip-text'>Add Ingredient</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }