import React from 'react';
import IngredientRow from './IngredientRow';
import {MdAdd} from 'react-icons/md';


function IngredientTable({ingredients, onEdit, onDelete, onCreate}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Serving Size</th><th>Calories</th><th>Calories Per 100g</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map((row, i) => <IngredientRow row={row} onEdit={onEdit} onDelete={onDelete} key={i} />)}
                <tr className='table-add'>
                    <td className='tooltip' colSpan='6'>
                        {<MdAdd onClick={() => onCreate()}/>}
                        <span className='tooltiptext'>New Ingredient</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
  

export default IngredientTable;