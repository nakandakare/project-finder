import React from 'react';
import './chat-overview.styles.scss';
import Chat from '../chat/chat.component';
import ChatTab from '../chat-tab/chat-tab.component';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import ChatPlaceholder from '../Placeholder/chat-placeholder/chat-placeholder.component';
import ChatProjectMembers from '../chat-project-members/chat-project-members.component';

const ChatOverview = ({ location }) => {
    const { query } = queryString.parseUrl(location.search);

    return (
        <div className='chatOverview'>
            <div className='chatTab'>
                <ChatTab />
            </div>
            {
                _.isEmpty(query) ?
                    <div className='chatPlaceholder'>
                        <ChatPlaceholder />
                    </div>
                    :
                    <div className='chat'>
                        <Chat />
                    </div>
            }
            {
                    <div className='chatProjectMembers'>
                        <ChatProjectMembers />
                    </div>
            }
        </div>
    )
}

export default withRouter(ChatOverview);