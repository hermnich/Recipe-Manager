import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MdDelete, MdEdit} from 'react-icons/md';


export default function IngredientRow({row, onLoad, onEdit, onDelete}) {
    const navigate = useNavigate();
    
    return (
        <tr>
            <td>
                <span className='btn btn-table tooltip' onClick={() => {navigate(`/ingredients/${row.ingredient_id}`)}}>{row.name}</span>
                <span className='tooltip-text'>View Ingredient</span>
            </td>
            <td>{row.serving_size}g</td>
            <td>{row.calories}</td>
            <td>
                <MdEdit className='btn btn-table tooltip' onClick={() => onEdit(row.ingredient_id)}/>
                <span className='tooltip-text'>Edit</span>
            </td>
            <td>
                <MdDelete className='btn btn-table tooltip' onClick={() => onDelete(row, onLoad)}/>
                <span className='tooltip-text'>Delete</span>
            </td>
        </tr>
    );
}