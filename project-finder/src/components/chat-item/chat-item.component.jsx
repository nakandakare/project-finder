import React from 'react';
import './chat-item.styles.scss';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

const ChatItem = ({project_id, projectname}) => {
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
                <p className='chat-item-message'>Last message</p>
            </div>
        </div>
    )
}

export default (ChatItem);