import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import EditControl from '../components/EditControl'
import NutritionEdit from '../components/NutritionEdit';
import * as Ingredients from '../modules/Ingredients'


export default function IngredientEdit() {
    const navigate = useNavigate()
    const {ingredient_id} = useParams();
    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        Ingredients.loadID(ingredient_id, setIngredient);
    }, []);

    return (
        <div className='page page-ingredient-edit'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>
                    <input type="text" value={ingredient.name} placeholder="Title" onChange={e => setIngredient({...ingredient, name: e.target.value})}/>
                </span>
                <EditControl 
                    onSave={() => Ingredients.updateID(ingredient)} 
                    onDelete={() => Ingredients.deleteID(ingredient, () => navigate(`/ingredients`))} 
                    onClose={() => {navigate(`/ingredients/${ingredient_id}`)}}/>
            </header>
            <NutritionEdit nutrition={ingredient} set_function={setIngredient}/>
        </div>
    )
}