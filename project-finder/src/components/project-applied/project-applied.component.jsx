import React from 'react';
import './project-applied.styles.scss';
import { Feed } from 'semantic-ui-react'
import Jdenticon from 'react-jdenticon';

const ProjectApplied = ({ project_id, project_name, accepted }) => {
  
    let feedText;

    if (accepted === true) {
        feedText = <p>Your apply to <Feed.User className='feedTitle'>{project_name}</Feed.User> has been accepted</p>
    } else if (accepted === false) {
        feedText = <p>Your apply to <Feed.User className='feedTitle'>{project_name}</Feed.User> has been rejected</p>
    } else {
        feedText = <p>Your apply to <Feed.User className='feedTitle'>{project_name}</Feed.User> is pending</p>
    }

    return (
        <Feed className='projectAppliedFeed'>
            <Feed.Event>
                <Feed.Label className='feedLabel'>
                    <div className='jdenticonFeed'>
                        <Jdenticon size="38" value={project_id.toString()} />
                    </div>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        {feedText}
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )
}

export default ProjectApplied;