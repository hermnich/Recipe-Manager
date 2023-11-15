import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'


function IngredientEdit() {
    const navigate = useNavigate()

    const {ingredient_id} = useParams();

    const [name, setName] = useState("");
    const [servingSize, setServingSize] = useState(0);
    const [calories, setCalories] = useState(0);
    const [calsPer100g, setCalsPer100g] = useState(0);

    const loadIngredient = async () => {
        const response = await fetch(`/ingredients/${ingredient_id}`);
        if (response.status === 200) {
            let ingredient = await response.json();
            ingredient = ingredient[0];
            setName(ingredient.name);
            setServingSize(ingredient.serving_size);
            setCalories(ingredient.calories);
            setCalsPer100g(ingredient.cals_per_100g);
        } else {
            console.error("Failed to get ingredient")
        }
    };
    useEffect(() => {
        loadIngredient();
    }, []);

    const updateIngredient = async () => {
        const ingredient = {
            name: name,
            serving_size: servingSize,
            calories: calories,
            cals_per_100g: calsPer100g
        }

        const response = await fetch(`/ingredients/${ingredient_id}`, {
            method: 'PUT',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             // alert("Successfully edited the ingredient!");
        } else {
             console.error(`Failed to edit recipe, status code = ${response.status}`);
        }     
    };

    const deleteIngredient = async () => {
        if (window.confirm(`Are you sure you want to delete this ingredient?`)) {
            const response = await fetch(`/ingredients/${ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                navigate(-1)
            } else {
            console.error(`Failed to delete ingredient with id = ${ingredient_id}, status code = ${response.status}`)
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
                <EditControl onSave={updateIngredient} onDelete={deleteIngredient}/>
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