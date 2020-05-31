import React from 'react';
import './chat-item.styles.scss';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';
import Jdenticon from 'react-jdenticon';

const ChatItem = ({ projectId, projectname, lastMessages }) => {
    const history = useHistory();
    const location = useLocation();

    if (location.search) {
        var { id } = queryString.parse(location.search);
    }

    const selectProject = () => {
        history.push(`/chat?project=${projectname}&id=${projectId}`)
    }

    return (
        <div className={'chat-item ' + (parseInt(id) === projectId ? 'selected' : 'notSelected')} onClick={selectProject}>
            <div className='chat-item-box'>
                <div className='jdenticon'>
                    <Jdenticon size="48" value={projectId.toString()} />
                </div>
                <div>
                    <p className='chat-item-title'>{projectname}</p>
                    {
                        lastMessages.map((lastMessage, i) => {
                            return (lastMessage.projectId === projectId ? <p key={i} className='chat-item-message'><b>{lastMessage.messageName.split(' ').slice(0, -1).join(' ')}:</b> {lastMessage.text}</p> : null)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default (ChatItem);