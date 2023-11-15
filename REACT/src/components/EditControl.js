import {MdSave, MdDelete} from 'react-icons/md';

function EditControl ({onSave, onDelete}) {

    return (
        <span className='app-edit'>
            <span className='tooltip'>
                {<MdDelete className='delete-button' onClick={onDelete}/>}
                <span className='tooltiptext'>Delete</span>
            </span>
            <span className='tooltip'>
                {<MdSave className='save-button' onClick={onSave}/>}
                <span className='tooltiptext'>Save</span>
            </span>
        </span>
    )
}

export default EditControl
