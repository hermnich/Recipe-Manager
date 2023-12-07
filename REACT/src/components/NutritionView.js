import React from 'react';


export default function NutritionView({nutrition}) {
    return (
        <fieldset className='nutrition'>
            <h2>Nutrition Facts</h2>
            <hr className='divider thin'/>
            <div className='serving-size'>
                <span className='label'>Serving Size</span>
                <span className='right value'>{nutrition.serving_size_text} ({Math.round(nutrition.serving_size)})g</span>
            </div>
            <hr className='divider thick'/>
            <div className='calories'>
                <div>Amount per serving</div>
                <span className='label'>Calories</span>
                <span className='right value'>{Math.round(nutrition.calories * 10) / 10}</span>
            </div>
            <hr className='divider medium'/>
            <div className='main-category'>
                <span className='label'>Total Fat </span> 
                <span className='value'>{Math.round(nutrition.total_fat * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <span className='label'>Saturated Fat </span>
                <span className='value'>{Math.round(nutrition.saturated_fat * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <span className='label'>Trans Fat </span>
                <span className='value'>{Math.round(nutrition.trans_fat * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <span className='label'>Cholesterol </span>
                <span className='value'>{Math.round(nutrition.cholesterol * 10) / 10}mg</span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <span className='label'>Sodium </span>
                <span className='value'>{Math.round(nutrition.sodium * 10) / 10}mg</span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <span className='label'>Total Carbohydrate </span>
                <span className='value'>{Math.round(nutrition.total_carbohydrate * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <span className='label'>Dietary Fiber </span>
                <span className='value'>{Math.round(nutrition.dietary_fiber * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category'>
                <span className='label'>Total Sugars </span>
                <span className='value'>{Math.round(nutrition.total_sugars * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='sub-category' id='added-sugars'>
                <span className='label'>Added Sugars </span>
                <span className='value'>{Math.round(nutrition.added_sugars * 10) / 10}g</span>
            </div>
            <hr className='divider thin'/>
            <div className='main-category'>
                <span className='label'>Protein </span>
                <span className='value'>{Math.round(nutrition.protein * 10) / 10}g</span>
            </div>
            <hr className='divider thick'/>
            <div className='vitamin'>
                <span className='label'>Vitamin D </span>
                <span className='value'>{Math.round(nutrition.vitamin_d * 10) / 10}mcg</span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <span className='label'>Calcium </span>
                <span className='value'>{Math.round(nutrition.calcium * 10) / 10}mg</span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <span className='label'>Iron </span>
                <span className='value'>{Math.round(nutrition.iron * 10) / 10}mg</span>
            </div>
            <hr className='divider thin'/>
            <div className='vitamin'>
                <span className='label'>Potassium </span>
                <span className='value'>{Math.round(nutrition.potassium * 10) / 10}mg</span>
            </div>
            <hr className='divider medium'/>
        </fieldset>
    )
}