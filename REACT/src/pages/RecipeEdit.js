import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'
import RecipeIngredientTable from '../components/RecipeIngredientTable'
import NutritionView from '../components/NutritionView';
import * as Recipes from '../modules/Recipes'
import * as RecipeIngredients from '../modules/RecipeIngredients'


export default function RecipeEdit() {
    const navigate = useNavigate();
    const {recipe_id} = useParams();
    const [recipe, setRecipe] = useState({})
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [nutrition, setNutrition] = useState({})

    useEffect(() => {
        Recipes.loadID(recipe_id, setRecipe);
    }, []);
    useEffect(() => {
        RecipeIngredients.load(recipe_id, recipe.servings, setRecipeIngredients, setNutrition)
    }, [recipe])

    return (
        <div className='page page-recipe-edit'>
            <div className='nav'>
                <Navigation/>
                <span className='title'>
                    <input type="text" value={recipe.name} placeholder="Title" onChange={e => setRecipe({...recipe, name: e.target.value})}/>
                </span >
                <EditControl 
                    onSave={() => Recipes.updateID(recipe)} 
                    onDelete={() => Recipes.deleteID(recipe, () => navigate(`/recipes`))} 
                    onClose={() => {navigate(`/recipes/${recipe_id}`)}}/>
            </div>
            <RecipeIngredientTable 
                recipeIngredients={recipeIngredients} 
                onCreate={(ingredient_id, onUpdate) => RecipeIngredients.create(recipe_id, ingredient_id, {}, onUpdate)}
                onUpdate={() => RecipeIngredients.load(recipe_id, recipe.servings, setRecipeIngredients, setNutrition)}
                onDelete={(row, onUpdate) => RecipeIngredients.deleteID(row, onUpdate)}/>
            <div className='data-input servings'>
                <label className='label'>Servings: </label>
                <input className='value' id='servings' type='number' min='1' value={recipe.servings} 
                onChange={e => {setRecipe({...recipe, servings: e.target.value})}}/>
            </div>
            <div className='data-input instructions'>
                <div className='label'>Instructions: </div>
                <textarea rows='10' value={recipe.instructions} onChange={e => setRecipe({...recipe, instructions: e.target.value})}/>
            </div>
            <NutritionView nutrition={nutrition}/>
        </div>
    )
}