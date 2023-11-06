import React from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';


function IngredientRow({row, onEdit, onDelete}) {
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.serving_size}</td>
            <td>{row.calories}</td>
            <td>{row.cals_per_100g}</td>
            <td className='row-edit'>
                <div className='tooltip'>
                    {<MdEdit onClick={() => onEdit(row)}/>}
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
  

export default IngredientRow;