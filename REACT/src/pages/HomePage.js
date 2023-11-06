import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import {MdAdd, MdEdit, MdDelete} from 'react-icons/md';

function HomePage({setRecipeToEdit, setIngredientToEdit}){
    const navigate = useNavigate()

    const browseRecipes = async () => {
        navigate(`/recipes`)
    }

    const browseIngredients = async () => {
        navigate(`/ingredients`)
    }

    const createRecipe = async () => {
        setRecipeToEdit({})
        navigate(`/recipes/edit`)
    }
    const createIngredient = async () => {
        setIngredientToEdit({})
        navigate(`/ingredients/edit`)
    }

    return (
        <div>
            <div className='nav-bar'>
                <Navigation/>
                <span className='title-text'>Recipe Manager</span>
                <span className='app-edit'>
                    <span className='add-popup'>
                        <span>
                            <select className='popup-select'>
                                <option onClick={createRecipe}>Recipe</option>
                                <option onClick={createIngredient}>Ingredient</option>
                            </select>
                        </span>
                    {<MdAdd className='add-button'/>}
                    </span>
                </span>
            </div>
            <div className='home-page-button'>
                <button
                    onClick={browseRecipes} >
                    Browse Recipes
                </button>
            </div>
            <div className='home-page-button'>
                <button
                    onClick={browseIngredients} >
                    Browse Ingredients
                </button>
            </div>
            <div className='release-info'>
                <fieldset>
                    <legend>What's New This Release</legend>
                    <div className='release-text'>
                        Add - Click one of the <MdAdd/> buttons to create a new item <br/>
                        Edit - Click one of the <MdEdit/> buttons to go to the edit page and make changes to an item <br/>
                        Delete - Click one of the <MdDelete/> buttons to delete an item. Caution! deleting an item is permanent <br/>
                        <br/>
                        <a href="https://github.com/hermnich/Recipe-Manager/releases">For more info see the release notes</a>
                    </div>
                </fieldset>
                
            </div>
        </div>
    )
}

export default HomePage;