import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'
import RecipeIngredientTable from '../components/RecipeIngredientTable'
import * as Recipes from '../modules/Recipes'
import * as RecipeIngredients from '../modules/RecipeIngredients'
import * as Nutrition from '../modules/Nutrition'


function RecipeEdit() {
    const navigate = useNavigate();

    const {recipe_id} = useParams();

    const [recipe, setRecipe] = useState({})
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [nutrition, setNutrition] = useState(Nutrition.emptyNutrition)

    useEffect(() => {
        Recipes.loadID(recipe_id, setRecipe);
        RecipeIngredients.load(recipe_id, setRecipeIngredients)
    }, []);

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
                onCreate={(onUpdate) => RecipeIngredients.create(recipe_id, {}, onUpdate)}
                onUpdate={() => RecipeIngredients.load(recipe_id, setRecipeIngredients)}
                onDelete={(row, onUpdate) => RecipeIngredients.deleteID(row, onUpdate)}/>
            <div className='data-input'>
                <label className='label'>Servings: </label>
                <input id='servings' type="number" value={recipe.servings} onChange={e => setRecipe({...recipe, servings: e.target.value})}/>
            </div>
            <div className='data-input'>
                <div className='label'>Instructions: </div>
                <textarea id='instructions' cols="70" rows="10" value={recipe.instructions} onChange={e => setRecipe({...recipe, instructions: e.target.value})}/>
            </div>
            <fieldset className='nutrition'>
                <h2>Nutrition Facts</h2>
                <hr className='divider thin'/>
                <div className='serving-size'>
                    <span className='label'>Serving Size</span>
                    <span className='right value'>{nutrition.serving_size_text} ({nutrition.serving_size})g</span>
                </div>
                <hr className='divider thick'/>
                <div className='calories'>
                    <div>Amount per serving</div>
                    <span className='label'>Calories</span>
                    <span className='right value'>{nutrition.calories}</span>
                </div>
                <hr className='divider medium'/>
                <div className='main-category'>
                    <span className='label'>Total Fat </span> 
                    <span className='value'>{nutrition.total_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Saturated Fat </span>
                    <span className='value'>{nutrition.saturated_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Trans Fat </span>
                    <span className='value'>{nutrition.trans_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Cholesterol </span>
                    <span className='value'>{nutrition.cholesterol}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Sodium </span>
                    <span className='value'>{nutrition.sodium}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Total Carbohydrate </span>
                    <span className='value'>{nutrition.total_carbohydrate}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Dietary Fiber </span>
                    <span className='value'>{nutrition.dietary_fiber}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Total Sugars </span>
                    <span className='value'>{nutrition.total_sugars}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category' id='added-sugars'>
                    <span className='label'>Added Sugars </span>
                    <span className='value'>{nutrition.added_sugars}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Protein </span>
                    <span className='value'>{nutrition.protein}g</span>
                </div>
                <hr className='divider thick'/>
                <div className='vitamin'>
                    <span className='label'>Vitamin D </span>
                    <span className='value'>{nutrition.vitamin_d}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Calcium </span>
                    <span className='value'>{nutrition.calcium}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Iron </span>
                    <span className='value'>{nutrition.iron}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Potassium </span>
                    <span className='value'>{nutrition.potassium}g</span>
                </div>
                <hr className='divider medium'/>
            </fieldset>
        </div>
    )
}

export default RecipeEdit;