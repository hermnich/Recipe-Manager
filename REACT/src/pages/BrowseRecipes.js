import React, {useState, useEffect} from 'react';
import RecipeTable from '../components/RecipeTable';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import {MdAdd} from 'react-icons/md';


function BrowseRecipes({setRecipeToEdit}){

    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([]);
	
    const loadRecipes = async () => {
        const response = await fetch('/recipes');
        if (response.status === 200) {
            const recipes = await response.json();
            setRecipes(recipes);
        } else {
            setRecipes([]);
        }
        
    };
        
    useEffect(() => {
        loadRecipes();
    }, []);

    const deleteRecipe = async recipe => {
        if (window.confirm(`Are you sure you want to delete recipe for ${recipe.name}?`)) {
            const response = await fetch(`/recipes/${recipe.recipe_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                loadRecipes()
            } else {
            console.error(`Failed to delete recipe with id = ${recipe.recipe_id}, status code = ${response.status}`)
            }
        }
    };

    const editRecipe = async recipeToEdit => {
        setRecipeToEdit(recipeToEdit);
        navigate("/recipes/edit");
    };

    const createRecipe = async () => {
        setRecipeToEdit({});
        navigate("/recipes/edit");
    };

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-text'>Recipes</span>
                <span className='app-edit'>
                    <span className='tooltip'>
                        {<MdAdd className='add-button' onClick={createRecipe}/>}
                        <span className='tooltiptext'>New Recipe</span>
                    </span>
                </span>
            </div>
            <div className='Recipe-table'>
                <RecipeTable recipes={recipes} onEdit={editRecipe} onDelete={deleteRecipe} onCreate={createRecipe}/>
            </div>
        </div>
    );
}

export default BrowseRecipes;