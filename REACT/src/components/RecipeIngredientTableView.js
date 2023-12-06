import {React, useState, useEffect} from 'react';
import RecipeIngredientRowView from './RecipeIngredientRowView';
import * as Ingredients from '../modules/Ingredients'


export default function RecipeIngredientTable({recipeIngredients}) {
    const [ingredients, setIngredients] = useState([])
    
    useEffect(() => {
        Ingredients.load(setIngredients);
    }, []);

    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Quantity</th><th>Calories</th></tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRowView row={row} ingredients={ingredients} key={i} />)}
            </tbody>
        </table>
    );
  }