import React from 'react';
import './user-picture.styles.scss';

const UserPicture = ({ img }) => {

    return (
        <div>
            <div className='user-picture'>
                <img className='picture' src={img} alt='Robots'></img>
            </div>
        </div>
    )
}

export default UserPicture;