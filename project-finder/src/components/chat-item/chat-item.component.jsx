import React from 'react';
import './chat-item.styles.scss';

const ChatItem = ({project_id, projectname}) => {
    return (
        <div className='chat-item'>
            <div className='chat-item-box'>
                <p className='chat-item-title'>{projectname}</p>
                <p className='chat-item-message'>Last message</p>
            </div>
        </div>
    )
}

export default ChatItem;