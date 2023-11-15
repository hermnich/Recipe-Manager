import React from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';


function RecipeRow({row, onEdit, onDelete}) {
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.servings}</td>
            <td>{row.cals_per_serving}</td>
            <td className='row-edit'>
                <div className='tooltip'>
                    {<MdEdit onClick={() => onEdit(row.recipe_id)}/>}
                    <span className='tooltiptext'>Edit</span>
                </div>
            </td>
            <td className='row-delete'>
                <div className='tooltip'>
                    {<MdDelete onClick={() => onDelete(row)}/>}
                    <span className='tooltiptext'>Delete</span>
                </div>
            </td>
        </tr>
    );
  }
  

export default RecipeRow;