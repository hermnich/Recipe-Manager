import {React} from 'react';

export default function RecipeIngredientRow({row, ingredients}) {
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.quantity_text} ({row.quantity}g)</td>
            <td>{row.quantity}</td>
            <td>{parseInt(row.calories * row.quantity / 100)}</td>
        </tr>
    );
}
