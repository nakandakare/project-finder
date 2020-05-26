import React, {useEffect} from 'react';
import './chat-tab.styles.scss';
import ChatItem from '../chat-item/chat-item.component';
import { selectProjectFromUser, selectCurrentUser } from '../../redux/user/user.selectors';
import { selectLastMessages} from '../../redux/chat/chat.selectors';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { lastMessageStart } from '../../redux/chat/chat.action';

const ChatTab = ({ projectsFromUser, currentUser, lastMessageStart, lastMessages}) => {
    
    //Getting id of current user to fetch last massage.
    useEffect(() => {
    const { id } = currentUser;    
    lastMessageStart(id);
    },[])

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
    lastMessageStart: (id) => dispatch(lastMessageStart(id))
})

const mapStateToProps = state => ({
    projectsFromUser: selectProjectFromUser(state),
    currentUser: selectCurrentUser(state),
    lastMessages: selectLastMessages(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);