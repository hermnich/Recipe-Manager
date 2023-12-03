import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import * as Ingredients from '../modules/Ingredients'
import {MdEdit, MdDelete} from 'react-icons/md';


export default function IngredientView() {
    const navigate = useNavigate()

    const {ingredient_id} = useParams();

    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        Ingredients.loadID(ingredient_id, setIngredient);
    }, []);

    return (
        <div className='page page-ingredient-view'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>{ingredient.name}</span>
                <span className='nav-edit'>
                    <MdDelete className='btn btn-nav tooltip' onClick={() => Ingredients.deleteID(ingredient, () => navigate(`/ingredients`))}/>
                    <span className='tooltip-text'>Delete Ingredient</span>
                    <MdEdit className='btn btn-nav tooltip' onClick={() => {navigate(`/ingredients/${ingredient_id}/edit`)}}/>
                    <span className='tooltip-text'>Edit Ingredient</span>
                </span>
            </header>

            <fieldset className='nutrition'>
                <h2>Nutrition Facts</h2>
                <hr className='divider thin'/>
                <div className='serving-size'>
                    <span className='label'>Serving Size</span>
                    <span className='right value'>{ingredient.serving_size_text} ({ingredient.serving_size})g</span>
                </div>
                <hr className='divider thick'/>
                <div className='calories'>
                    <div>Amount per serving</div>
                    <span className='label'>Calories</span>
                    <span className='right value'>{ingredient.calories}</span>
                </div>
                <hr className='divider medium'/>
                <div className='main-category'>
                    <span className='label'>Total Fat </span> 
                    <span className='value'>{ingredient.total_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Saturated Fat </span>
                    <span className='value'>{ingredient.saturated_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Trans Fat </span>
                    <span className='value'>{ingredient.trans_fat}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Cholesterol </span>
                    <span className='value'>{ingredient.cholesterol}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Sodium </span>
                    <span className='value'>{ingredient.sodium}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Total Carbohydrate </span>
                    <span className='value'>{ingredient.total_carbohydrate}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Dietary Fiber </span>
                    <span className='value'>{ingredient.dietary_fiber}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <span className='label'>Total Sugars </span>
                    <span className='value'>{ingredient.total_sugars}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category' id='added-sugars'>
                    <span className='label'>Added Sugars </span>
                    <span className='value'>{ingredient.added_sugars}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <span className='label'>Protein </span>
                    <span className='value'>{ingredient.protein}g</span>
                </div>
                <hr className='divider thick'/>
                <div className='vitamin'>
                    <span className='label'>Vitamin D </span>
                    <span className='value'>{ingredient.vitamin_d}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Calcium </span>
                    <span className='value'>{ingredient.calcium}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Iron </span>
                    <span className='value'>{ingredient.iron}g</span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <span className='label'>Potassium </span>
                    <span className='value'>{ingredient.potassium}g</span>
                </div>
                <hr className='divider medium'/>
            </fieldset>
        </div>
    )
}