
function toServing(ingredient) {
    for (const [key, value] of Object.entries(ingredient)){
        if (key === 'ingredient_id' || key === 'name' || key === 'serving_size_text' || key === 'serving_size') {
            continue
        }
        ingredient[key] = ingredient.serving_size * value / 100
    }
    return ingredient
}

async function toPercent(ingredient) {
    let to_convert = {}
    for (const [key, value] of Object.entries(ingredient)){
        if (key === 'ingredient_id' || key === 'name' || key === 'serving_size_text' || key === 'serving_size') {
            continue
        }
        to_convert[key] = value
    }

    console.log(`Converting to percent:`)
    console.log(to_convert)

    const response = await fetch(`http://localhost:4000/percent?total=${ingredient.serving_size}`, {
        method: 'POST',
        body: JSON.stringify(to_convert),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 200){
        let result = await response.json();
        console.log(`Results:`)
        console.log(result)
        result.ingredient_id = ingredient.ingredient_id
        result.name = ingredient.name
        result.serving_size_text = ingredient.serving_size_text
        result.serving_size = ingredient.serving_size
        return result
    } else {
        console.error(`Failed to create ingredient, status code = ${response.status}`);
    }
}


async function create(ingredient, nav_function) {
    const response = await fetch(`/ingredients`, {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 201){
        const result = await response.json();
        nav_function(`/ingredients/${result.id}/edit`)
    } else {
        console.error(`Failed to create ingredient, status code = ${response.status}`);
    }  
}

async function load(set_function) {
    const response = await fetch('/ingredients');
    if (response.status === 200) {
        const ingredients = await response.json();
        set_function(ingredients);
    } else {
        set_function([])
    }
}

async function loadID(id, set_function) {
    const response = await fetch(`/ingredients/${id}`);
    if (response.status === 200) {
        const result = await response.json();
        set_function(toServing(result[0]));
    } else {
        console.error("Failed to get ingredient")
    }
};

async function updateID(ingredient) {
    const data = await toPercent(ingredient)
    const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.status !== 200){
        console.error(`Failed to edit ingredient, status code = ${response.status}`);
    }
};

async function deleteID(ingredient, load_function) {
    if (window.confirm(`Are you sure you want to delete the ingredient ${ingredient.name}?`)) {
        const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            load_function()
        } else {
            console.error(`Failed to delete ingredient with id = ${ingredient.ingredient_id}, status code = ${response.status}`)
        }
    };
}

export {create, load, loadID, updateID, deleteID}