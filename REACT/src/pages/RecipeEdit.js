import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'
import RecipeIngredientTable from '../components/RecipeIngredientTable'


function RecipeEdit() {
    const navigate = useNavigate();

    const {recipe_id} = useParams();

    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [name, setName] = useState('');
    const [servings, setServings] = useState(0);
    const [calsPerServing, setCalsPerServing] = useState(0);
    const [instructions, setInstructions] = useState('');

    const loadRecipe = async () => {
        const response = await fetch(`/recipes/${recipe_id}`);
        if (response.status === 200) {
            let recipe = await response.json();
            recipe = recipe[0];
            setName(recipe.name);
            setServings(recipe.servings);
            setCalsPerServing(recipe.cals_per_serving);
            setInstructions(recipe.instructions);
        } else {
            console.error("Failed to get recipe")
        }
        
    };
    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipeIngredients = async () => {
        const response = await fetch(`/recipes/${recipe_id}/ingredients`);
        if (response.status === 200) {
            const recipeIngredients = await response.json();
            setRecipeIngredients(recipeIngredients);
        } else {
            setRecipeIngredients([])
        }
    };
    useEffect(() => {
        loadRecipeIngredients();
    }, []);

    const updateRecipe = async () => {
        const recipe = {
            name: name,
            servings: servings,
            cals_per_serving: calsPerServing,
            instructions: instructions
        }
        const response = await fetch(`/recipes/${recipe_id}`, {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             // console.log(`Successfully edited the recipe!\n${JSON.stringify(recipe)}`);
        } else {
             console.error(`Failed to edit recipe, status code = ${response.status}`);
        }
    };

    const deleteRecipe = async () => {
        if (window.confirm(`Are you sure you want to delete this recipe?`)) {
            const response = await fetch(`/recipes/${recipe_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                navigate(-1)
            } else {
            console.error(`Failed to delete recipe with id = ${recipe_id}, status code = ${response.status}`)
            }
        }
    }

    const deleteRecipeIngredient = async (ingredient) => {
        if (window.confirm(`Are you sure you want to remove ${ingredient.name} from this recipe?`)) {
            const response = await fetch(`/recipe_ingredients/${ingredient.recipe_ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                loadRecipeIngredients(ingredient.recipe_id);
            } else {
                console.error(`Failed to remove ${ingredient.name}, status code = ${response.status}`)
            }
        }
    };

    const insertRecipeIngredient = async () => {
        const recipeIngredient = {
            recipe_id: recipe_id,
            ingredient_id: null,
            quantity: '',
            grams: 0
        }
        const response = await fetch(`/recipes/${recipe_id}/ingredients`, {
            method: 'POST',
            body: JSON.stringify(recipeIngredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if(response.status === 201){
            // console.log(`Successfully created the ingredient!\n${JSON.stringify(recipeIngredient)}`);
            loadRecipeIngredients();
        } else {
            console.error(`Failed to create the ingredient, status code = ${response.status}`);
        }        
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-input'>
                    <input
                        type="text"
                        placeholder="Title"
                        value={name}
                        onChange={e => {setName(e.target.value)}}/>
                </span >
                <EditControl onSave={updateRecipe} onDelete={deleteRecipe}/>
            </div>
            <div className='recipe-ingredient-table'>
                <RecipeIngredientTable recipeIngredients={recipeIngredients} onDelete={deleteRecipeIngredient} onUpdate={loadRecipeIngredients} onCreate={insertRecipeIngredient}/>
            </div>
            <div className='data-input'>
                <label>Servings: </label>
                <input
                    type="number"
                    value={servings}
                    onChange={e => {setServings(e.target.value) }}/>
            </div>
            <div className='data-input'>
                <label>Calories per Serving: </label>
                <input
                    type="number"
                    value={calsPerServing}
                    onChange={e => {setCalsPerServing(e.target.value)}}/>
            </div>
            <p className='instruction-label'>Instructions: </p>
            <div className='instruction-input'>
                <textarea
                    cols="70"
                    rows="10"
                    value={instructions}
                    onChange={e => {setInstructions(e.target.value)}}/>
            </div>
        </div>
    )
}

export default RecipeEdit;