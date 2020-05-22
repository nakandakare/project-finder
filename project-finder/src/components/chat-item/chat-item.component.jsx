import React from 'react';
import './chat-item.styles.scss';
import { useHistory } from "react-router-dom";

const ChatItem = ({project_id, projectname}) => {
    const history = useHistory();

    const selectProject = () => {
        history.push(`/chat?project=${projectname}&id=${project_id}`)
    }
    return (
        <div className='chat-item' onClick={selectProject}>
            <div className='chat-item-box'>
                <p className='chat-item-title'>{projectname}</p>
                <p className='chat-item-message'>Last message</p>
            </div>
        </div>
    )
}

export default (ChatItem);