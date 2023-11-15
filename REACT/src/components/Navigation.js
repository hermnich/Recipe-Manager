import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MdHome, MdArrowBack} from 'react-icons/md';

function Navigation() {
    const navigate = useNavigate()

    return (
        <span className='app-nav'>
            <MdHome className='home-button' onClick={() => {navigate(`/`)}}/>
            <MdArrowBack className='back-button' onClick={() => {navigate(-1)}}/>
        </span>
    );
  }
  

export default Navigation;