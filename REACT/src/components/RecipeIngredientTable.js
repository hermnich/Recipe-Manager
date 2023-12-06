import {React, useState, useEffect} from 'react';
import RecipeIngredientRow from './RecipeIngredientRow';
import IngredientSelectOption from './ingredientSelectOption';
import * as Ingredients from '../modules/Ingredients'
import {MdAdd} from 'react-icons/md';


export default function RecipeIngredientTable({recipeIngredients, onCreate, onUpdate, onDelete}) {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        Ingredients.load(setIngredients);
    }, []);

    async function togglePopup() {
        const popup = document.getElementById('popup-select')
        if (popup.style.visibility === 'hidden') {
            popup.style.visibility = 'visible';
          } else {
            popup.style.visibility = 'hidden';
          }
    }

    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Quantity</th><th>Calories</th></tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRow row={row} ingredients={ingredients} onUpdate={onUpdate} onDelete={onDelete} key={i} />)}
                <tr>
                    <td className='table-add' colSpan='5'>
                        <MdAdd className='btn btn-table tooltip' onClick={togglePopup}/>
                        <span className='tooltip-text'>Add Ingredient</span>
                        <span id='popup-select' style={{'visibility': 'hidden'}}>
                            <select
                                onChange={e => {onCreate(e.target.value, onUpdate)}}>
                                {ingredients.map((ingredient, i) => <IngredientSelectOption ingredient={ingredient} key={i} />)}
                            </select>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }