import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import RecipeTable from '../components/RecipeTable';
import * as Recipes from '../modules/Recipes'
import {MdAdd} from 'react-icons/md';


export default function BrowseRecipes(){
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        Recipes.load(setRecipes);
    }, []);

    return (
        <div className='page page-browse-recipes'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>Recipes</span>
                <span className='nav-edit'>
                    <MdAdd className='btn btn-nav tooltip' onClick={() => Recipes.create({}, navigate)}/>
                    <span className='tooltip-text'>New Recipe</span>
                </span>
            </header>
            <RecipeTable 
                recipes={recipes} 
                onCreate={() => Recipes.create({}, navigate)}
                onLoad={() => Recipes.load(setRecipes)}
                onEdit={(id) => navigate(`/recipes/${id}/edit`)} 
                onDelete={Recipes.deleteID} />
        </div>
    );
}