import React from 'react';
import './input.styles.scss';
import { Icon } from 'semantic-ui-react'

const Input = ({ message, setMessage, sendMessage}) => {
    return (
    <form className="formIn">
            <input
                className="inputIn"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}><Icon name='send' size='big' /></button>
    </form>
    )
}

export default Input;