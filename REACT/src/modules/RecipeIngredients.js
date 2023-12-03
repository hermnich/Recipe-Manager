async function create(recipe_id, recipeIngredient, load_function) {
    const response = await fetch(`/recipes/${recipe_id}/ingredients`, {
        method: 'POST',
        body: JSON.stringify(recipeIngredient),
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

async function load(recipe_id, set_function) {
    const response = await fetch(`/recipes/${recipe_id}/ingredients`);
    if (response.status === 200) {
        const recipeIngredients = await response.json();
        set_function(recipeIngredients);
    } else {
        set_function([])
    }
};

async function updateID(recipeIngredient) {
    const data = {
        ingredient_id: recipeIngredient.ingredient_id,
        quantity_text: recipeIngredient.quantity_text,
        quantity: recipeIngredient.quantity
    }
    const response = await fetch(`/recipe_ingredients/${recipeIngredient.recipe_ingredient_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status !== 200) {
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