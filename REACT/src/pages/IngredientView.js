import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../components/Navigation'
import NutritionView from '../components/NutritionView';
import * as Ingredients from '../modules/Ingredients'
import {MdEdit, MdDelete} from 'react-icons/md';


export default function IngredientView() {
    const navigate = useNavigate()
    const {ingredient_id} = useParams();
    const [ingredient, setIngredient] = useState({})

    useEffect(() => {
        Ingredients.loadID(ingredient_id, setIngredient);
    }, []);

    return (
        <div className='page page-ingredient-view'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>{ingredient.name}</span>
                <span className='nav-edit'>
                    <MdDelete className='btn btn-nav tooltip' onClick={() => Ingredients.deleteID(ingredient, () => navigate(`/ingredients`))}/>
                    <span className='tooltip-text'>Delete Ingredient</span>
                    <MdEdit className='btn btn-nav tooltip' onClick={() => {navigate(`/ingredients/${ingredient_id}/edit`)}}/>
                    <span className='tooltip-text'>Edit Ingredient</span>
                </span>
            </header>
            <NutritionView nutrition={ingredient}/>
        </div>
    )
}