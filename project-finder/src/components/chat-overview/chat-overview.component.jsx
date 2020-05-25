import React from 'react';
import './chat-overview.styles.scss';
import Chat from '../chat/chat.component';
import ChatTab from '../chat-tab/chat-tab.component';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import ChatPlaceHolder from '../chat-placeholder/chat-placeholder.component';
import ChatProjectMembers from '../chat-project-members/chat-project-members.component';

const ChatOverview = ({ location }) => {
    const { query } = queryString.parseUrl(location.search);

    return (
        <div className='chat-overview'>
            <div className='chat-tab'>
                <ChatTab />
            </div>
            {
                _.isEmpty(query) ?
                    <div className='placeholder'>
                        <ChatPlaceHolder />
                    </div>
                    :
                    <div className='chat-view'>
                        <Chat />
                    </div>
            }
            <div className='chat-project-members'>
                <ChatProjectMembers />
            </div>
        </div>
    )
}

export default withRouter(ChatOverview);