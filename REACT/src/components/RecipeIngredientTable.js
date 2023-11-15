import {React, useState, useEffect} from 'react';
import RecipeIngredientRow from './RecipeIngredientRow';
import {MdAdd} from 'react-icons/md';


function RecipeIngredientTable({recipeIngredients, onDelete, onUpdate, onCreate}) {
    
    const [ingredients, setIngredients] = useState([])
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

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Quantity (Imperial)</th><th>Quantity (g)</th><th>Calories</th>
                </tr>
            </thead>
            <tbody>
                {recipeIngredients.map((row, i) => <RecipeIngredientRow row={row} ingredients={ingredients} onDelete={onDelete} onUpdate={onUpdate} key={i} />)}
                <tr className='table-add' >
                    <td className='tooltip' colSpan='5'>
                        {<MdAdd onClick={() => {onCreate()}}/>}
                        <span className='tooltiptext'>Add Ingredient</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
  

export default RecipeIngredientTable;