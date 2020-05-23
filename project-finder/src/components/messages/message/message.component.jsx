import React from 'react';
import './message.styles.scss';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, messageName }, name}) => {
    let isSentByCurrentUser = false;

    if (messageName === name) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{name.split(' ').slice(0, -1).join(' ')}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10 ">{messageName.split(' ').slice(0, -1).join(' ')}</p>
                </div>
            )
    );
}

export default Message;
