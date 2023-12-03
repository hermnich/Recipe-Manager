
const emptyNutrition = {
    "serving_size": 0,
    "calories": 0,
    "total_fat": 0,
    "saturated_fat": 0,
    "trans_fat": 0,
    "cholesterol": 0,
    "sodium": 0,
    "total_carbohydrate": 0,
    "dietary_fiber": 0,
    "total_sugars": 0,
    "added_sugars": 0,
    "protein": 0,
    "vitamin_d": 0,
    "calcium": 0,
    "iron": 0,
    "potassium": 0,
}

async function calcNutrition(recipeIngredients, set_function) {
    let nutrition = emptyNutrition
    for (const index in recipeIngredients) {
        for (const key in nutrition) {
            if (key in recipeIngredients[index]) {
                nutrition[key] += recipeIngredients[index][key] * recipeIngredients[index].quantity / 100
            }
        }
    }
    console.log(nutrition)
    set_function(nutrition)
}

export {emptyNutrition, calcNutrition}