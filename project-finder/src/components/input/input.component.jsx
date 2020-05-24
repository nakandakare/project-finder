import React from 'react';
import './input.styles.scss';

const Input = ({message, setMessage, sendMessage}) => {
    return (
    <form className="form-in">
            <input
                className="input-in"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
    )
}

export default Input;