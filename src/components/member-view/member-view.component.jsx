import React from 'react';
import './member-view.styles.scss';
import { Icon } from 'semantic-ui-react'
import UserPicture from '../user-picture/user-picture.component';

const MemberView = ({ id, name, project_owner, img }) => {

    return (
        <div className='projectMember'>
            <div className='innerProjectMember'>
            <UserPicture img={img} />
            {
                project_owner ?
                <div className='projectMemberTitleOwner'> 
                    <Icon  color='grey' size='large' title='Project Leader' name='chess king'/> 
                    <p>{name}</p>
                </div>
                    :
                <div className='projectMemberTitle'>    
                    <p>{name}</p>
                </div>
                
            }
            </div>
        </div>
    )
}

export default MemberView;