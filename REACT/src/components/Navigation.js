import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MdHome, MdArrowBack} from 'react-icons/md';


export default function Navigation() {
    const navigate = useNavigate()

    return (
        <span className='nav-app'>
            <MdHome className='btn btn-nav tooltip' onClick={() => {navigate(`/`)}}/>
            <span className='tooltip-text'>Home</span>
            <MdArrowBack className='btn btn-nav tooltip' onClick={() => {navigate(-1)}}/>
            <span className='tooltip-text'>Back</span>
        </span>
    );
}