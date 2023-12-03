import React from 'react';
import IngredientRow from './IngredientRow';
import {MdAdd} from 'react-icons/md';


export default function IngredientTable({ingredients, onCreate, onLoad, onEdit, onDelete}) {
    return (
        <table>
            <thead>
                <tr><th>Name</th><th>Serving Size</th><th>Calories<br/>(per 100g)</th></tr>
            </thead>
            <tbody>
                {ingredients.map((row, i) => <IngredientRow row={row} onLoad={onLoad} onEdit={onEdit} onDelete={onDelete} key={i} />)}
                <tr>
                    <td className='table-add' colSpan='5'>
                        <MdAdd className='btn btn-table tooltip' onClick={() => onCreate()}/>
                        <span className='tooltip-text'>New Ingredient</span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
