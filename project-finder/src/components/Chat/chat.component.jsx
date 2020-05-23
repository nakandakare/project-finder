import React, { useEffect, useState } from 'react';
import './chat.styles.scss';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import InfoBar from '../info-bar/info-bar.component';
import Input from '../input/input.component';
import Messages from '../messages/messages.component';
let socket;

const Chat = ({ currentUser, location }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id, project } = queryString.parse(location.search);
    const { name } = currentUser;

    useEffect(() => {
        socket = io('localhost:2500');
        
        socket.emit('join', {id});

        return () => { //hook unmount
            socket.off();
        }
    }, [location.search]); //hook

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages, location.search]);

    // function for sending messages
    const sendMessage = (event) => {
        if (message) {
            event.preventDefault();
            socket.emit('sendMessage', { message, name, id }, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={project} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

export default withRouter(connect(mapStateToProps)(Chat));