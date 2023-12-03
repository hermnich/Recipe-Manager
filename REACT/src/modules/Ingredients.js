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
        set_function(result[0]);
    } else {
        console.error("Failed to get ingredient")
    }
};

async function updateID(ingredient) {
    const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, {
        method: 'PUT',
        body: JSON.stringify(ingredient),
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