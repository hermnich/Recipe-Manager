import React, {useState, useEffect} from 'react';
import IngredientTable from '../components/IngredientTable';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import {MdAdd} from 'react-icons/md';


function BrowseIngredients({setIngredientToEdit}){

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

    const onDelete = async ingredient => {
        if (window.confirm(`Are you sure you want to delete the ingredient ${ingredient.name}?`)) {
            const response = await fetch(`/ingredients/${ingredient.ingredient_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                loadIngredients()
            } else {
            console.error(`Failed to delete ingredient with id = ${ingredient.ingredient_id}, status code = ${response.status}`)
            }
        };
    }	

    const onEdit = async ingredientToEdit => {
        setIngredientToEdit(ingredientToEdit);
        navigate("/ingredients/edit");
    }

    const onCreate = async () => {
        setIngredientToEdit({});
        navigate("/ingredients/edit");
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-text'>Ingredients</span>
                <span className='app-edit'>
                    <span className='tooltip'>
                        {<MdAdd className='add-button' onClick={onCreate}/>}
                        <span className='tooltiptext'>New Ingredient</span>
                    </span>
                </span>
            </div>
            <div className='Ingredient-table'>
                <IngredientTable ingredients={ingredients} onEdit={onEdit} onDelete={onDelete} onCreate={onCreate}/>
            </div>
        </div>
    )
}

export default BrowseIngredients;