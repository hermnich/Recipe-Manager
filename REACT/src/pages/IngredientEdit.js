import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'


function IngredientEdit({ingredientToEdit}) {
    const navigate = useNavigate()

    const [name, setName] = useState(ingredientToEdit.name);
    const [servingSize, setServingSize] = useState(ingredientToEdit.serving_size);
    const [calories, setCalories] = useState(ingredientToEdit.calories);
    const [calsPer100g, setCalsPer100g] = useState(ingredientToEdit.cals_per_100g);

    const saveIngredient = async () => {
        const ingredient = {
            name: name,
            serving_size: servingSize,
            calories: calories,
            cals_per_100g: calsPer100g
        }
        if ("ingredient_id" in ingredientToEdit) {
            updateIngredient(ingredient)
        } else {
            insertIngredient(ingredient)
        }
    };
    
    const updateIngredient = async (ingredient) => {
        const response = await fetch(`/ingredients/${ingredientToEdit.ingredient_id}`, {
            method: 'PUT',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the ingredient!");
        } else {
             alert(`Failed to edit recipe, status code = ${response.status}`);
        }     
    };

    const insertIngredient = async (ingredient) => {
        const response = await fetch(`/ingredients`, {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully created the ingredient!");
       } else {
            alert(`Failed to create ingredient, status code = ${response.status}`);
       }     
    }

    const deleteIngredient = async ingredient => {
        if (window.confirm(`Are you sure you want to delete this ingredient?`)) {
            const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                navigate(-1)
            } else {
            console.error(`Failed to delete ingredient with id = ${ingredient.ingredient_id}, status code = ${response.status}`)
            }
        };
    }	
    
    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-input'>
                    <input
                        type="text"
                        placeholder="Title"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </span>
                <EditControl onSave={saveIngredient} onDelete={deleteIngredient}/>
            </div>
            
            <div className='data-input'>
                <label>Serving Size (g): </label>
                <input
                    type="number"
                    value={servingSize}
                    onChange={e => setServingSize(e.target.value)} />
            </div>
            <div className='data-input'>
                <label>Calories Per Serving: </label>
                <input
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)} />
            </div>
            <div className='data-input'>
                <label>Calories per 100g: </label>
                <input
                    type="number"
                    value={calsPer100g}
                    onChange={e => setCalsPer100g(e.target.value)} />
            </div>
        </div>
    )
}

export default IngredientEdit;