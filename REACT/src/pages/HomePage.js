import React from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation'
import * as Ingredients from '../modules/Ingredients'
import * as Recipes from '../modules/Recipes'
import {MdAdd, MdEdit, MdDelete} from 'react-icons/md';

export default function HomePage(){
    const navigate = useNavigate()

    async function togglePopup() {
        const popup = document.getElementById('popup-add')
        if (popup.style.visibility === 'hidden') {
            popup.style.visibility = 'visible';
          } else {
            popup.style.visibility = 'hidden';
          }
    }

    return (
        <div className='page page-home'>
            <header className='nav'>
                <Navigation/>
                <span className='title'>Recipe Manager</span>
                <span className='nav-edit'>
                    <span id='popup-add' style={{'visibility': 'hidden'}}>
                        <input className='btn btn-popup' type='button' value='Recipe' onClick={() => Recipes.create({}, navigate)}/><br/>
                        <input className='btn btn-popup' type='button' value='Ingredient' onClick={() => Ingredients.create({}, navigate)}/>
                    </span>
                    <MdAdd className='btn btn-nav tooltip' onClick={togglePopup}/>
                    <span className='tooltip-text'>Create New Item</span>
                </span>
            </header>

            <p><input className='btn btn-browse' type='button' value='Browse Recipes' onClick={e => {navigate(`/recipes`)}}/></p>

            <p><input className='btn btn-browse' type='button' value='Browse Ingredients' onClick={e => {navigate(`/ingredients`)}}/></p>
                
            <div className="release-info">
                <fieldset>
                    <legend><strong>What's New This Release</strong></legend>
                    <p>
                        Add - Click one of the <MdAdd/> buttons to create a new item <br/>
                        Edit - Click one of the <MdEdit/> buttons to go to the edit page and make changes to an item <br/>
                        Delete - Click one of the <MdDelete/> buttons to delete an item. Caution! deleting an item is permanent <br/>
                        <br/>
                        <a href='https://github.com/hermnich/Recipe-Manager/releases'>For more info see the release notes</a>
                    </p>
                </fieldset>
            </div>
        </div>
    )
}