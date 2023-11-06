import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'
import IngredientSelectRow from '../components/ingredientSelectRow';


function RecipeIngredientEdit({ recipeIngredientToEdit }) {
    const navigate = useNavigate()

    const [ingredients, setIngredients] = useState([])
    const recipeId = recipeIngredientToEdit.recipe_id
    const [ingredientId, setIngredientId] = useState([])
    const [quantity, setQuantity] = useState(recipeIngredientToEdit.quantity);
    const [grams, setGrams] = useState(recipeIngredientToEdit.grams);

    const loadIngredients = async () => {
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

    const saveRecipeIngredient = async () => {
        const ingredient = {
            recipe_id: recipeId,
            ingredient_id: ingredientId,
            quantity: quantity,
            grams: grams,
        }
        if ("recipe_ingredient_id" in recipeIngredientToEdit) {
            updateRecipeIngredient(ingredient)
        } else {
            insertRecipeIngredient(ingredient)
        }
    };

    const updateRecipeIngredient = async (ingredient) => {
        const response = await fetch(`/recipes/${ingredient.recipe_id}/ingredients/${ingredient.ingredient_id}`, {
            method: 'PUT',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the ingredient!");
        } else {
            alert(`Failed to edit ingredient, status code = ${response.status}`);
        }
    };

    const insertRecipeIngredient = async (ingredient) => {
        const response = await fetch(`/recipes/${ingredient.recipe_id}/ingredients`, {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully created the ingredient!");
        } else {
            alert(`Failed to create ingredient, status code = ${response.status}`);
        }
    }

    const deleteRecipeIngredient = async (ingredient) => {
        if (window.confirm(`Are you sure you want to remove this ingredient?`)) {
            const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                navigate(-1)
            } else {
                console.error(`Failed to delete ingredient with id = ${ingredient.ingredient_id}, status code = ${response.status}`)
            }
        };
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation />
                <span className='title-text'>
                    <select
                        value={recipeIngredientToEdit.ingredient_id}
                        label={recipeIngredientToEdit.name}
                        onChange={e => {setIngredientId(e.target.value)}}>
                        {ingredients.map((row, i) => <IngredientSelectRow row={row} key={i} />)}
                    </select>
                </span>
                <EditControl onSave={saveRecipeIngredient} onDelete={deleteRecipeIngredient} />
            </div>
            <div className='Data-input'>
                <label>Quantity: </label>
                <input
                    type="text"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />
            </div>
            <div className='Data-input'>
                <label>Grams: </label>
                <input
                    type="number"
                    value={grams}
                    onChange={e => setGrams(e.target.value)} />
            </div>
        </div>
    )
}

export default RecipeIngredientEdit;