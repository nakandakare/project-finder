import React from 'react';
import './messages.styles.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message/message.component';
import {connect} from 'react-redux';
import {selectMessageLoading} from '../../redux/chat/chat.selectors';

const Messages = ({ messages, name, id}) => {

    return (
        <ScrollToBottom className="messages">
            {   
                messages.map((message, i) => message.projectId === parseInt(id) ? <div key={i}><Message message={message} name={name} /></div> : null)
            }
        </ScrollToBottom>
    )
}

const mapStateToProps = (state) => ({
    messageLoading: selectMessageLoading(state)
})

export default connect(mapStateToProps)(Messages);