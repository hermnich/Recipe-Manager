import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import IngredientTable from '../components/IngredientTable';
import * as Ingredients from '../modules/Ingredients'
import {MdAdd} from 'react-icons/md';


export default function BrowseIngredients(){
    const navigate = useNavigate()

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        Ingredients.load(setIngredients);
    }, []);

    return (
        <div className='page page-browse-ingredients'>
            <div className='nav'>
                <Navigation/>
                <span className='title'>Ingredients</span>
                <span className='nav-edit'>
                    <MdAdd className='btn btn-nav tooltip' onClick={() => Ingredients.create({}, navigate)}/>
                    <span className='tooltip-text'>New Ingredient</span>
                </span>
            </div>
            <IngredientTable ingredients={ingredients} 
                onCreate={() => Ingredients.create({}, navigate)}
                onLoad={() => Ingredients.load(setIngredients)}
                onEdit={(id) => navigate(`/ingredients/${id}/edit`)}
                onDelete={Ingredients.deleteID}/>
        </div>
    )
}