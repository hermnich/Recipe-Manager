import React from 'react';
import RecipeRow from './RecipeRow';
import {MdAdd} from 'react-icons/md';


export default function RecipeTable({recipes, onEdit, onLoad, onDelete, onCreate}) {
    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Servings</th><th>Calories<br/>per Serving</th></tr>
            </thead>
            <tbody>
                {recipes.map((row, i) => <RecipeRow row={row} onEdit={onEdit} onLoad={onLoad} onDelete={onDelete} key={i} />)}
                <tr>
                    <td className='table-add' colSpan='5'>
                        <MdAdd className='btn btn-table tooltip' onClick={() => onCreate()}/>
                        <span className='tooltip-text'>New Recipe</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
