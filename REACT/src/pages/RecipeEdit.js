import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import RecipeIngredientTable from '../components/RecipeIngredientTable'
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'


function RecipeEdit({recipeToEdit, setRecipeIngredientToEdit}) {
    const navigate = useNavigate()

    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [name, setName] = useState(recipeToEdit.name);
    const [servings, setServings] = useState(recipeToEdit.servings);
    const [calsPerServing, setCalsPerServing] = useState(recipeToEdit.cals_per_serving);
    const [instructions, setInstructions] = useState(recipeToEdit.instructions);

    const saveRecipe = async () => {
        const recipe = {
            name: name,
            servings: servings,
            cals_per_serving: calsPerServing,
            instructions: instructions
        }
        if ("recipe_id" in recipeToEdit) {
            updateRecipe(recipe);
        } else {
            insertRecipe(recipe);
        }
    }

    const updateRecipe = async (recipe) => {
        const response = await fetch(`/recipes/${recipeToEdit.recipe_id}`, {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the recipe!");
        } else {
             alert(`Failed to edit recipe, status code = ${response.status}`);
        }     
    };

    const insertRecipe = async (recipe) => {
        const response = await fetch(`/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully created the recipe!");
       } else {
            alert(`Failed to create recipe, status code = ${response.status}`);
       }     
    };

    const deleteRecipe = async (recipe) => {
        if (window.confirm(`Are you sure you want to delete this recipe?`)) {
            const response = await fetch(`/recipes/${recipe.recipe_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                navigate(-1)
            } else {
            console.error(`Failed to delete recipe with id = ${recipe.recipe_id}, status code = ${response.status}`)
            }
        }
    }

    const deleteRecipeIngredient = async ingredient => {
        if (window.confirm(`Are you sure you want to remove ${ingredient.name} from this recipe?`)) {
            const response = await fetch(`/recipes/${ingredient.recipe_id}/ingredients/${ingredient.ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                loadRecipeIngredients(ingredient.recipe_id)
            } else {
            console.error(`Failed to remove ${ingredient.name}, status code = ${response.status}`)
            }
        }
    };

    const editRecipeIngredient = async recipeIngredientToEdit => {
        setRecipeIngredientToEdit(recipeIngredientToEdit);
        navigate(`/recipes/edit/ingredients`);
    };

    const createRecipeIngredient = async recipe_id => {
        console.log(recipe_id)
        setRecipeIngredientToEdit({recipe_id: recipe_id});
        navigate(`/recipes/edit/ingredients`);
    }

    const loadRecipeIngredients = async recipe_id => {
        const response = await fetch(`/recipes/${recipe_id}/ingredients`);
        if (response.status === 200) {
            const recipeIngredients = await response.json();
            setRecipeIngredients(recipeIngredients);
        } else {
            setRecipeIngredients([])
        }
        
    };

    useEffect(() => {
        loadRecipeIngredients(recipeToEdit.recipe_id);
    }, []);


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
                <EditControl onSave={saveRecipe} onDelete={deleteRecipe}/>
            </div>
            <div className='recipe-ingredient-table'>
                <RecipeIngredientTable recipeIngredients={recipeIngredients} onEdit={editRecipeIngredient} onDelete={deleteRecipeIngredient} onCreate={createRecipeIngredient} recipe_id={recipeToEdit.recipe_id}/>
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