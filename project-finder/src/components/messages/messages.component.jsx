import React from 'react';
import './messages.styles.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message/message.component';

const Messages = ({ messages, name, id}) => {

    return (
        <ScrollToBottom className="messages">
            {   
                messages.map((message, i) => message.projectId === parseInt(id) ? <div key={i}><Message message={message} name={name} /></div> : null)
            }
        </ScrollToBottom>
    )
}

export default Messages;