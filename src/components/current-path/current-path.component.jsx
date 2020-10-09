import React from 'react';
import './current-path.styles.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/arrow.svg';
import { useLocation } from 'react-router-dom'

const CurrentPath = () => {

    const {pathname} = useLocation();
    const pathReplaced = pathname.replace("/","");

    return(
    <div className='currentPath'>
        <Link className='homeButton' to='/projects'>
            Home
        </Link>
        <Logo>
        </Logo>
        <span className='currentLocation'>
            {pathReplaced.charAt(0).toUpperCase() + pathReplaced.slice(1)}
        </span>
    </div>
    )
}

export default CurrentPath;