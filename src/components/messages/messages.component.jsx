import React from 'react';
import './messages.styles.scss';
import Message from './message/message.component';

const Messages = ({ messages, name, id}) => {

    return (
        <div className="messages">
            {   
                messages.map((message, i) => message.projectId === parseInt(id) ? <div key={i}><Message message={message} name={name} /></div> : null)
            }
        </div>
    )
}

export default Messages;