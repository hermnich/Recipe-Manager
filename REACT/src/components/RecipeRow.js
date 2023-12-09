import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MdDelete, MdEdit} from 'react-icons/md';


export default function RecipeRow({row, onEdit, onLoad, onDelete}) {
    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <span className='btn btn-table tooltip' onClick={e => {navigate(`/recipes/${row.recipe_id}`)}}>{row.name}</span>
                <span className='tooltip-text'>View Recipe</span>
            </td>
            <td>{row.servings}</td>
            <td>{row.calories}</td>
            <td>
                <MdEdit className='btn btn-table tooltip' onClick={() => onEdit(row.recipe_id)}/>
                <span className='tooltip-text'>Edit</span>
            </td>
            <td>
                <MdDelete className='btn btn-table tooltip' onClick={() => onDelete(row, onLoad)}/>
                <span className='tooltip-text'>Delete</span>
            </td>
        </tr>
    );
}