import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import IngredientTable from '../components/IngredientTable';
import {MdAdd} from 'react-icons/md';


function BrowseIngredients(){
    const navigate = useNavigate()

    const [ingredients, setIngredients] = useState([]);
    const loadIngredients = async () => {
        const response = await fetch('/ingredients');
        if (response.status === 200) {
            const ingredients = await response.json();
            setIngredients(ingredients);
        } else {
            setIngredients([])
        }
        
    }
    useEffect(() => {
        loadIngredients();
    }, []);

    const deleteIngredient = async ingredient => {
        if (window.confirm(`Are you sure you want to delete the ingredient ${ingredient.name}?`)) {
            const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                loadIngredients()
            } else {
            console.error(`Failed to delete ingredient with id = ${ingredient.ingredient_id}, status code = ${response.status}`)
            }
        };
    }	

    const editIngredient = async ingredient_id => {
        navigate(`/ingredients/${ingredient_id}/edit`);
    }

    const insertIngredient = async () => {
        const ingredient = {
            name: "Title",
            serving_size: 0,
            calories: 0,
            cals_per_100g: 0
        }
        const response = await fetch(`/ingredients`, {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if(response.status === 201){
            // console.log(`Successfully created the recipe!\n${JSON.stringify(ingredient)}`);
            const result = await response.json();
            return result.ingredient_id;
        } else {
            console.error(`Failed to create recipe, status code = ${response.status}`);
        }  
    }
    const createIngredient = async () => {
        const ingredient_id = await insertIngredient();
        navigate(`/ingredients/${ingredient_id}/edit`)
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-text'>Ingredients</span>
                <span className='app-edit'>
                    <span className='tooltip'>
                        {<MdAdd className='add-button' onClick={createIngredient}/>}
                        <span className='tooltiptext'>New Ingredient</span>
                    </span>
                </span>
            </div>
            <div className='Ingredient-table'>
                <IngredientTable ingredients={ingredients} onEdit={editIngredient} onDelete={deleteIngredient} onCreate={createIngredient}/>
            </div>
        </div>
    )
}

export default BrowseIngredients;