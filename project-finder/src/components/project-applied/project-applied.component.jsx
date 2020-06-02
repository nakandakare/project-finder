import React from 'react';
import './project-applied.styles.scss';
import { Feed, Icon } from 'semantic-ui-react'
import Jdenticon from 'react-jdenticon';

const ProjectApplied = ({ project_id, project_name }) => {
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
                        Your apply to <Feed.User className='feedTitle'>{project_name}</Feed.User> is pending
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )
}

export default ProjectApplied;