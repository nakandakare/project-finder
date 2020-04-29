import React from 'react';
import './chat-overview.styles.scss';
import Chat from '../chat/chat.component';
import ChatTab from '../chat-tab/chat-tab.component';

const ChatOverview = () => {
    return (
        <div className='chat-overview'>
            <div className='chat-tab'>
                <ChatTab />
            </div>
            <div className='chat-view'>
                <Chat />
            </div>
        </div>
    )
}

export default ChatOverview;