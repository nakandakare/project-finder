import React from 'react';
import './current-path.styles.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/arrow.svg';
import { useLocation } from 'react-router-dom'

const CurrentPath = () => {

    const {pathname} = useLocation();
    const pathReplaced = pathname.replace("/","");

    return(
    <div className='current-path'>
        <Link className='home-button' to='/projects'>
            Home
        </Link>
        <Logo>
        </Logo>
        <span className='current-location'>
            {pathReplaced.charAt(0).toUpperCase() + pathReplaced.slice(1)}
        </span>
    </div>
    )
}

export default CurrentPath;