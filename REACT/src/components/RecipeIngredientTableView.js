import {React, useState, useEffect} from 'react';
import RecipeIngredientRowView from './RecipeIngredientRowView';

export default function RecipeIngredientTable({recipeIngredients}) {
    
    const [ingredients, setIngredients] = useState([])
    async function loadIngredients() {
        const response = await fetch('/ingredients');
        if (response.status === 200) {
            const ingredients = await response.json();
            setIngredients(ingredients);
        } else {
            setIngredients([])
        }
    }
    useEffect(() => {
        loadIngredients();
    }, []);

    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Quantity (Imperial)</th><th>Quantity (g)</th><th>Calories</th></tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRowView row={row} ingredients={ingredients} key={i} />)}
            </tbody>
        </table>
    );
  }