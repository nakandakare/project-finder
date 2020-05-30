import React from 'react';
import './chat-placeholder.styles.scss';
import InfoBar from '../../info-bar/info-bar.component';
import Input from '../../input/input.component';
import ChatIconPng from '../../../assets/chat-grey.png';

const ChatPlaceholder = () => {
    return (
        <div>
            <InfoBar/>
            <div className='noChatMessage'>
            <img className='chatIcon' src={ChatIconPng} />
            <p className='chatIconText'>Select which project you want to start chatting...</p>
            </div>
            <div className='inputPlaceholder'>
            <Input  setMessage={() => null}/>
            </div>
        </div>
    )
    
}

export default ChatPlaceholder;