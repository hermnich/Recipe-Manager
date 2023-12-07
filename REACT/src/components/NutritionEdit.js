import React from 'react';

export default function NutritionEdit({nutrition, set_function}) {
    return (
        <fieldset className='nutrition'>
            <h2>Nutrition Facts</h2>
            <hr className='divider thin'/>
            <div className='serving-size'>
                <label className='label'>Serving Size</label>
                <span className='right value'>
                    <input type='text' value={nutrition.serving_size_text} placeholder="1 Cup" 
                        onChange={e => set_function({...nutrition, serving_size_text: e.target.value})}/> (
                    <input type='number' value={Math.round(nutrition.serving_size)} 
                        onChange={e => set_function({...nutrition, serving_size: e.target.value})}/>g)
                </span>
            </div>
            <hr className='divider thick'/>
            <div className='calories'>
                <div>Amount per serving</div>
                <label className='label' for='calories'>Calories</label>
                <span className='right value'>
                    <input id='calories' type='number' value={Math.round(nutrition.calories * 10) / 10} 
                        onChange={e => set_function({...nutrition, calories: e.target.value})}/>
                </span>
            </div>
            <hr className='divider medium'/>
            <div className='main-category'>
                <label className='label' for='total-fat'>Total Fat</label>
                <span className='value'>
                    <input id='total-fat' type='number' value={Math.round(nutrition.total_fat * 10) / 10} 
                        onChange={e => set_function({...nutrition, total_fat: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <label className='label' for='saturated-fat'>Saturated Fat</label>
                <span className='value'>
                    <input id='saturated-fat' type='number' value={Math.round(nutrition.saturated_fat * 10) / 10} 
                        onChange={e => set_function({...nutrition, saturated_fat: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <label className='label' for='trans-fat'>Trans Fat</label>
                <span className='value'>
                    <input id='trans-fat' type='number' value={Math.round(nutrition.trans_fat * 10) / 10} 
                        onChange={e => set_function({...nutrition, trans_fat: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <label className='label' for='cholesterol'>Cholesterol</label>
                <span className='value'>
                    <input id='cholesterol' type='number' value={Math.round(nutrition.cholesterol * 10) / 10} 
                        onChange={e => set_function({...nutrition, cholesterol: e.target.value})}/>mg
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <label className='label' for='sodium'>Sodium</label>
                <span className='value'>
                    <input id='sodium' type='number' value={Math.round(nutrition.sodium * 10) / 10} 
                        onChange={e => set_function({...nutrition, sodium: e.target.value})}/>mg
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <label className='label' for='total-carbohydrate'>Total Carbohydrate</label>
                <span className='value'>
                    <input id='total-carbohydrate' type='number' value={Math.round(nutrition.total_carbohydrate * 10) / 10} 
                        onChange={e => set_function({...nutrition, total_carbohydrate: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <label className='label' for='dietary-fiber'>Dietary Fiber</label>
                <span className='value'>
                    <input id='dietary-fiber' type='number' value={Math.round(nutrition.dietary_fiber * 10) / 10} 
                        onChange={e => set_function({...nutrition, dietary_fiber: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <label className='label' for='total-sugars'>Total Sugars</label>
                <span className='value'>
                    <input id='total-sugars' type='number' value={Math.round(nutrition.total_sugars * 10) / 10} 
                        onChange={e => set_function({...nutrition, total_sugars: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category added-sugars'>
                <label className='label' for='added-sugars'>Added Sugars</label>
                <span className='value'>
                    <input id='added-sugars' type='number' value={Math.round(nutrition.added_sugars * 10) / 10} 
                        onChange={e => set_function({...nutrition, added_sugars: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <label className='label' for='protein'>Protein</label>
                <span className='value'>
                    <input id='protein' type='number' value={Math.round(nutrition.protein * 10) / 10} 
                        onChange={e => set_function({...nutrition, protein: e.target.value})}/>g
                </span>
            </div>
            <hr className='divider thick'/>
            <div className='vitamin'>
                <label className='label' for='vitamin-d'>Vitamin D</label>
                <span className='value'>
                    <input id='vitamin-d' type='number' value={Math.round(nutrition.vitamin_d * 10) / 10} 
                        onChange={e => set_function({...nutrition, vitamin_d: e.target.value})}/>mcg
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <label className='label' for='calcium'>Calcium</label>
                <span className='value'>
                    <input id='calcium' type='number' step='0.1' value={nutrition.calcium} 
                        onChange={e => set_function({...nutrition, calcium: e.target.value})}/>mg
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <label className='label' for='iron'>Iron</label>
                <span className='value'>
                    <input id='iron' type='number' step='0.1' value={nutrition.iron} 
                        onChange={e => set_function({...nutrition, iron: e.target.value})}/>mg
                </span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <label className='label' for='potassium'>Potassium</label>
                <span className='value'>
                    <input id='potassium' type='number' step='0.1' value={nutrition.potassium} 
                        onChange={e => set_function({...nutrition, potassium: e.target.value})}/>mg
                </span>
            </div>
            <hr className='divider medium'/>
        </fieldset>
    )
}