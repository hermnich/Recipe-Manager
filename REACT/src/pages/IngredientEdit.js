import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import * as Ingredients from '../modules/Ingredients'
import EditControl from '../components/EditControl'


export default function IngredientEdit() {
    const navigate = useNavigate()

    const {ingredient_id} = useParams();

    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        Ingredients.loadID(ingredient_id, setIngredient);
    }, []);

    return (
        <div className='page page-ingredient-edit'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>
                    <input type="text" value={ingredient.name} placeholder="Title" onChange={e => setIngredient({...ingredient, name: e.target.value})}/>
                </span>
                <EditControl onSave={() => Ingredients.updateID(ingredient)} onDelete={() => Ingredients.deleteID(ingredient, () => navigate(`/ingredients`))} onClose={() => {navigate(`/ingredients/${ingredient_id}`)}}/>
            </header>
            <fieldset className='nutrition'>
                <h2>Nutrition Facts</h2>
                <hr className='divider thin'/>
                <div className='serving-size'>
                    <label className='label'>Serving Size</label>
                    <span className='right value'>
                        <input type="text" value={ingredient.serving_size_text} placeholder="1 Cup" onChange={e => setIngredient({...ingredient, serving_size_text: e.target.value})}/> (
                        <input type="number" value={ingredient.serving_size} onChange={e => setIngredient({...ingredient, serving_size: e.target.value})}/>g)
                    </span>
                </div>
                <hr className='divider thick'/>
                <div className='calories'>
                    <div>Amount per serving</div>
                    <label className='label' for='calories'>Calories</label>
                    <span className='right value'>
                        <input id='calories' type="number" value={ingredient.calories} onChange={e => setIngredient({...ingredient, calories: e.target.value})}/>
                    </span>
                </div>
                <hr className='divider medium'/>
                <div className='main-category'>
                    <label className='label' for='total-fat'>Total Fat</label>
                    <span className='value'>
                        <input id='total-fat' type='number' value={ingredient.total_fat} onChange={e => setIngredient({...ingredient, total_fat: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <label className='label' for='saturated-fat'>Saturated Fat</label>
                    <span className='value'>
                        <input id='saturated-fat' type='number' value={ingredient.saturated_fat} onChange={e => setIngredient({...ingredient, saturated_fat: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <label className='label' for='trans-fat'>Trans Fat</label>
                    <span className='value'>
                        <input id='trans-fat' type='number' value={ingredient.trans_fat} onChange={e => setIngredient({...ingredient, trans_fat: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <label className='label' for='cholesterol'>Cholesterol</label>
                    <span className='value'>
                        <input id='cholesterol' type='number' value={ingredient.cholesterol} onChange={e => setIngredient({...ingredient, cholesterol: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <label className='label' for='sodium'>Sodium</label>
                    <span className='value'>
                        <input id='sodium' type='number' value={ingredient.sodium} onChange={e => setIngredient({...ingredient, sodium: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <label className='label' for='total-carbohydrate'>Total Carbohydrate</label>
                    <span className='value'>
                        <input id='total-carbohydrate' type='number' value={ingredient.total_carbohydrate} onChange={e => setIngredient({...ingredient, total_carbohydrate: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <label className='label' for='dietary-fiber'>Dietary Fiber</label>
                    <span className='value'>
                        <input id='dietary-fiber' type='number' value={ingredient.dietary_fiber} onChange={e => setIngredient({...ingredient, dietary_fiber: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category'>
                    <label className='label' for='total-sugars'>Total Sugars</label>
                    <span className='value'>
                        <input id='total-sugars' type='number' value={ingredient.total_sugars} onChange={e => setIngredient({...ingredient, total_sugars: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='sub-category added-sugars'>
                    <label className='label' for='added-sugars'>Added Sugars</label>
                    <span className='value'>
                        <input id='added-sugars' type='number' value={ingredient.added_sugars} onChange={e => setIngredient({...ingredient, added_sugars: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='main-category'>
                    <label className='label' for='protein'>Protein</label>
                    <span className='value'>
                        <input id='protein' type='number' value={ingredient.protein} onChange={e => setIngredient({...ingredient, protein: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thick'/>
                <div className='vitamin'>
                    <label className='label' for='vitamin-d'>Vitamin D</label>
                    <span className='value'>
                        <input id='vitamin-d' type='number' value={ingredient.vitamin_d} onChange={e => setIngredient({...ingredient, vitamin_d: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <label className='label' for='calcium'>Calcium</label>
                    <span className='value'>
                        <input id='calcium' type='number' value={ingredient.calcium} onChange={e => setIngredient({...ingredient, calcium: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <label className='label' for='iron'>Iron</label>
                    <span className='value'>
                        <input id='iron' type='number' value={ingredient.iron} onChange={e => setIngredient({...ingredient, iron: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider thin'/>
                <div className='vitamin'>
                    <label className='label' for='potassium'>Potassium</label>
                    <span className='value'>
                        <input id='potassium' type='number' value={ingredient.potassium} onChange={e => setIngredient({...ingredient, potassium: e.target.value})}/>g
                    </span>
                </div>
                <hr className='divider medium'/>
            </fieldset>
        </div>
    )
}