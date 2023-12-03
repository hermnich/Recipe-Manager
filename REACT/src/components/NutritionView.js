
export default function NutritionView(nutrition) {

    return (
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
    )
}