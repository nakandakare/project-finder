import React, {useEffect, useState} from 'react';
import './chat-tab.styles.scss';
import ChatItem from '../chat-item/chat-item.component';
import { selectProjectFromUser, selectCurrentUser } from '../../redux/user/user.selectors';
import { selectLastMessages} from '../../redux/chat/chat.selectors';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { lastMessageStart, newLastMessage } from '../../redux/chat/chat.action';
import io from 'socket.io-client';
import { ENDPOINT } from '../../constants/constants';
import ScrollToBottom from 'react-scroll-to-bottom';

let socket;

const ChatTab = ({ projectsFromUser, currentUser, lastMessageStart, lastMessages, newLastMessage}) => {
    const [filterValue, setFilterValue] = useState('');

    const filteredProjects = projectsFromUser.filter(project => project.projectname.toLowerCase().includes(filterValue));
    
    //Fetching last massage of chat when enter /chat.
    useEffect(() => {
    const { id } = currentUser;    
    lastMessageStart(id);
    }, [])

    //Joining the user to all rooms of projects
    useEffect(() => {
        const projectsId = projectsFromUser.map(project => project.projectId)
        socket = io(ENDPOINT);
        socket.emit('join', { id: projectsId });
    }, []);

    //Setting new last message on message sent
    useEffect(() => {
        socket.on('message', (message) => {
            newLastMessage([message]);
        })
    }, []);

    const projectSearchHandle = (event) => {
        setFilterValue(event.target.value.toLowerCase()); //re-render after this setState.
    }

    return (
        <div className='chatTab'>
            <div className='chat-tab-header'>
                <Icon className='chat-tab-icon' inverted name='book' size='large' />
                <p className='chat-tab-title'>Your Projects</p>
            </div>
            <div className='chatTabSearch'>
                <Icon className='chatTabSearchIcon' color='grey' name='search' size='large' />
                <input placeholder='Search project...' className='chatTabSearchInput' onChange={projectSearchHandle}/>
            </div>
            <div className='chatTabItem'>
                <ScrollToBottom className='scrollStyles'>
                {
                    filteredProjects.map(({...otherProps }, i) => <ChatItem key={i} lastMessages={lastMessages} {...otherProps} />)
                }
                </ScrollToBottom>
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