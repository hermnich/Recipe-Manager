import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MdHome, MdArrowBack} from 'react-icons/md';

function Navigation() {
    const navigate = useNavigate()

    const navHome = async () => {
        navigate(`/`)
    }

    const navBack = async () => {
        navigate(-1);
    }

    return (
        <span className='app-nav'>
            <MdHome className='home-button' onClick={navHome}/>
            <MdArrowBack className='back-button' onClick={navBack}/>
        </span>
    );
  }
  

export default Navigation;