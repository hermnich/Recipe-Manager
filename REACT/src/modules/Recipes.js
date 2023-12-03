async function create(recipe, nav_function) {
    const response = await fetch(`/recipes`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 201){
        const result = await response.json();
        nav_function(`/recipes/${result.id}/edit`)
    } else {
        console.error(`Failed to create recipe, status code = ${response.status}`);
    }  
}

async function load(set_function) {
    const response = await fetch('/recipes');
    if (response.status === 200) {
        const results = await response.json();
        set_function(results);
    } else {
        set_function([])
    }
}

async function loadID(id, set_function) {
    const response = await fetch(`/recipes/${id}`);
    if (response.status === 200) {
        const result = await response.json();
        set_function(result[0]);
    } else {
        console.error("Failed to get recipe")
    }
};

async function updateID(recipe) {
    const response = await fetch(`/recipes/${recipe.recipe_id}`, {
        method: 'PUT',
        body: JSON.stringify(recipe),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.status !== 200){
        console.error(`Failed to edit recipe, status code = ${response.status}`);
    }
};

async function deleteID(recipe, load_function) {
    if (window.confirm(`Are you sure you want to delete the recipe ${recipe.name}?`)) {
        const response = await fetch(`/recipes/${recipe.recipe_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            load_function()
        } else {
            console.error(`Failed to delete recipe with id = ${recipe.recipe_id}, status code = ${response.status}`)
        }
    };
}

export {create, load, loadID, updateID, deleteID}