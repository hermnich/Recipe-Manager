
async function calcNutrition(recipeIngredients, num_servings, set_function) {
    let nutrition = {
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

    for (const index in recipeIngredients) {
        for (const key in nutrition) {
            if (key === 'serving_size') {
                nutrition.serving_size += recipeIngredients[index].quantity / num_servings
            } else if (key in recipeIngredients[index]) {
                nutrition[key] += recipeIngredients[index][key] * recipeIngredients[index].quantity / 100 / num_servings
            }
        }
    }
    set_function(nutrition)
}

async function create(recipe_id, ingredient_id, data, load_function) {
    data.recipe_id = recipe_id;
    data.ingredient_id = ingredient_id;
    const response = await fetch(`/recipes/${recipe_id}/ingredients`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 201){
        load_function();
    } else {
        console.error(`Failed to create the ingredient, status code = ${response.status}`);
    }        
}

async function load(recipe_id, num_servings, set_ingredients_function, set_nutrition_function) {
    const response = await fetch(`/recipes/${recipe_id}/ingredients`);
    if (response.status === 200) {
        const recipeIngredients = await response.json();
        set_ingredients_function(recipeIngredients);
        calcNutrition(recipeIngredients, num_servings, set_nutrition_function);
    } else {
        set_ingredients_function([])
        set_nutrition_function({})
    }
};

async function updateID(recipe_ingredient_id, data, load_function) {
    const response = await fetch(`/recipe_ingredients/${recipe_ingredient_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200) {
        load_function()
    } else {
        console.error(`Failed to edit ingredient, status code = ${response.status}`);
    }
};

async function deleteID(recipeIngredient, load_function) {
    if (window.confirm(`Are you sure you want to remove ${recipeIngredient.name} from this recipe?`)) {
        const response = await fetch(`/recipe_ingredients/${recipeIngredient.recipe_ingredient_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            load_function();
        } else {
            console.error(`Failed to remove ${recipeIngredient.name}, status code = ${response.status}`)
        }
    }
};

export {create, load, updateID, deleteID}