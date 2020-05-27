import React from 'react';
import './chat-item.styles.scss';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

const ChatItem = ({project_id, projectname, lastMessages}) => {
    const history = useHistory();
    const location = useLocation();

    if(location.search){
        var { id } = queryString.parse(location.search);
    }
     
    const selectProject = () => {
        history.push(`/chat?project=${projectname}&id=${project_id}`)
    }

    return (
        <div className={'chat-item ' + (parseInt(id) === project_id ? 'selected' : 'notSelected')} onClick={selectProject}>
            <div className='chat-item-box'>
                <p className='chat-item-title'>{projectname}</p>
                {
                    lastMessages.map((lastMessage, i) => {
                        return (lastMessage.projectId === project_id ? <p key={i} className='chat-item-message'><b>{lastMessage.messageName.split(' ').slice(0, -1).join(' ')}:</b> {lastMessage.text}</p> : null)
                    })
                }
            </div>
        </div>
    )
}

export default (ChatItem);