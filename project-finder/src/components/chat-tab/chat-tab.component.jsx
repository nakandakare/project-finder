import React, {useEffect, useState} from 'react';
import './chat-tab.styles.scss';
import ChatItem from '../chat-item/chat-item.component';
import { selectProjectFromUser, selectCurrentUser } from '../../redux/user/user.selectors';
import { selectLastMessages} from '../../redux/chat/chat.selectors';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { lastMessageStart, newLastMessage } from '../../redux/chat/chat.action';
import io from 'socket.io-client';

let socket;

const ChatTab = ({ projectsFromUser, currentUser, lastMessageStart, lastMessages, newLastMessage}) => {
    //Fetching last massage of chat when enter /chat.
    useEffect(() => {
    const { id } = currentUser;    
    lastMessageStart(id);
    }, [])

    //Joining the user to all rooms of projects
    useEffect(() => {
        const projectsId = projectsFromUser.map(project => project.project_id)
        socket = io('localhost:2500');
        socket.emit('join', { id: projectsId });
    }, []);

    //Setting new last message on message sent
    useEffect(() => {
        socket.on('message', (message) => {
            newLastMessage([message]);
        })
    }, []);

    return (
        <div>
            <div className='chat-tab-header'>
                <Icon className='chat-tab-icon' inverted name='book' size='large' />
                <p className='chat-tab-title'>Your Projects</p>
            </div>
            <div>
                {
                    projectsFromUser.map(({...otherProps }, i) => <ChatItem key={i} lastMessages={lastMessages} {...otherProps} />)
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    lastMessageStart: (id) => dispatch(lastMessageStart(id)),
    newLastMessage: (message) => dispatch(newLastMessage(message))
})

const mapStateToProps = state => ({
    projectsFromUser: selectProjectFromUser(state),
    currentUser: selectCurrentUser(state),
    lastMessages: selectLastMessages(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);