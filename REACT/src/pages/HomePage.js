import React from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import {MdAdd, MdEdit, MdDelete} from 'react-icons/md';

function HomePage({onCreateRecipe, onCreateIngredient}){
    const navigate = useNavigate()

    const insertRecipe = async () => {
        const recipe = {
            name: "Title",
            servings: 0,
            cals_per_serving: 0,
            instructions: ''
        }
        const response = await fetch(`/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if(response.status === 201){
            // console.log(`Successfully created the recipe!\n${JSON.stringify(recipe)}`);
            const result = await response.json();
            return result.recipe_id;
        } else {
            console.error(`Failed to create recipe, status code = ${response.status}`);
        }        
    }
    const createRecipe = async () => {
        const recipe_id = await insertRecipe();
        navigate(`/recipes/${recipe_id}/edit`)
    }
  
    const insertIngredient = async () => {
        const ingredient = {
            name: "Title",
            serving_size: 0,
            calories: 0,
            cals_per_100g: 0
        }
        const response = await fetch(`/ingredients`, {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if(response.status === 201){
            // console.log(`Successfully created the recipe!\n${JSON.stringify(ingredient)}`);
            const result = await response.json();
            return result.ingredient_id;
        } else {
            console.error(`Failed to create recipe, status code = ${response.status}`);
        }  
    }
    const createIngredient = async () => {
        const ingredient_id = await insertIngredient();
        navigate(`/ingredients/${ingredient_id}/edit`)
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-text'>Recipe Manager</span>
                <span className='app-edit'>
                    <span className='add-popup'>
                        <span>
                            <select className='popup-select'>
                                <option onClick={createRecipe}>Recipe</option>
                                <option onClick={createIngredient}>Ingredient</option>
                            </select>
                        </span>
                    {<MdAdd className='add-button'/>}
                    </span>
                </span>
            </div>
            <div className='home-page-button'>
                <button
                    onClick={e => {navigate(`/recipes`)}} >
                    Browse Recipes
                </button>
            </div>
            <div className='home-page-button'>
                <button
                    onClick={e => {navigate(`/ingredients`)}} >
                    Browse Ingredients
                </button>
            </div>
            <div className='release-info'>
                <fieldset>
                    <legend>What's New This Release</legend>
                    <div className='release-text'>
                        Add - Click one of the <MdAdd/> buttons to create a new item <br/>
                        Edit - Click one of the <MdEdit/> buttons to go to the edit page and make changes to an item <br/>
                        Delete - Click one of the <MdDelete/> buttons to delete an item. Caution! deleting an item is permanent <br/>
                        <br/>
                        <a href="https://github.com/hermnich/Recipe-Manager/releases">For more info see the release notes</a>
                    </div>
                </fieldset>
                
            </div>
        </div>
    )
}

export default HomePage;