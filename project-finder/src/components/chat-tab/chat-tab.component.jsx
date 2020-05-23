import React from 'react';
import './chat-tab.styles.scss';
import ChatItem from '../chat-item/chat-item.component';
import { selectProjectFromUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

const ChatTab = ({ ProjectsFromUser }) => {
    return (
        <div>
            <div className='chat-tab-header'>
                <Icon className='chat-tab-icon' inverted name='book' size='large' />
                <p className='chat-tab-title'>Your Projects</p>
            </div>
            <div>
                {
                    ProjectsFromUser.map(({ project_id, ...otherProps }) => <ChatItem key={project_id} project_id={project_id} {...otherProps} />)
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    ProjectsFromUser: selectProjectFromUser(state)
})

export default connect(mapStateToProps)(ChatTab);