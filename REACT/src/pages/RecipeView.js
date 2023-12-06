import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import RecipeIngredientTableView from '../components/RecipeIngredientTableView'
import NutritionView from '../components/NutritionView';
import * as Recipes from '../modules/Recipes'
import * as RecipeIngredients from '../modules/RecipeIngredients'
import {MdEdit, MdDelete} from 'react-icons/md';


export default function RecipeView() {
    const navigate = useNavigate();
    const {recipe_id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [nutrition, setNutrition] = useState({});

    useEffect(() => {
        Recipes.loadID(recipe_id, setRecipe)
        RecipeIngredients.load(recipe_id, recipe.servings, setRecipeIngredients, setNutrition)
    }, []);

    return (
        <div className='page page-recipe-view'>
            <div className='nav'>
                <Navigation/>
                <span className='title'>
                    <input type="text" placeholder="Title" value={recipe.name} onChange={e => setRecipe({...recipe, name: e.target.value})}/>
                </span >
                <span className='nav-edit'>
                    <MdDelete className='btn btn-nav tooltip' onClick={() => Recipes.deleteID(recipe, () => navigate(`/recipes`))}/>
                    <span className='tooltip-text'>Delete Ingredient</span>
                    <MdEdit className='btn btn-nav tooltip' onClick={e => {navigate(`/recipes/${recipe_id}/edit`)}}/>
                    <span className='tooltip-text'>Edit Recipe</span>
                </span>
            </div>
            <RecipeIngredientTableView recipeIngredients={recipeIngredients}/>
            <div className='data-view servings'>
                <span className='label'>Servings: </span>
                <span className='value'>{recipe.servings}</span>
            </div>
            <div className='data-view instructions'>
                <div className='label'>Instructions: </div>
                <fieldset className='value'>
                    <p>{recipe.instructions}</p>
                </fieldset>
            </div>
            <NutritionView nutrition={nutrition}/>
        </div>
    )
}