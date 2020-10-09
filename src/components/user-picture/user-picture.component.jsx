import React from 'react';
import './user-picture.styles.scss';

const UserPicture = ({ img, width }) => {

    return (
        <div>
            <div className='user-picture'>
                <img className='picture' style={{width: width}} src={img} alt='Robots'></img>
            </div>
        </div>
    )
}

export default UserPicture;