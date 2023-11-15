import React from 'react';
import RecipeRow from './RecipeRow';
import {MdAdd} from 'react-icons/md';


function RecipeTable({recipes, onEdit, onDelete, onCreate}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Servings</th><th>Calories</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((row, i) => <RecipeRow row={row} onEdit={onEdit} onDelete={onDelete} key={i} />)}
                <tr className='table-add'>
                    <td className='tooltip' colSpan='5'>
                        {<MdAdd onClick={() => onCreate()}/>}
                        <span className='tooltiptext'>New Recipe</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
  

export default RecipeTable;