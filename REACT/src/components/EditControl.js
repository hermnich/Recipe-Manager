import React from 'react';
import {MdSave, MdDelete, MdClose} from 'react-icons/md';


export default function EditControl ({onSave, onDelete, onClose}) {
    return (
        <span className='nav-edit'>
            <MdDelete className='btn btn-nav tooltip' onClick={onDelete}/>
            <span className='tooltip-text'>Delete</span>
            <MdSave className='btn btn-nav tooltip' onClick={onSave}/>
            <span className='tooltip-text'>Save</span>
            <MdClose className='btn btn-nav tooltip' onClick={onClose}/>
            <span className='tooltip-text'>Close Editor</span>
        </span>
    )
}
