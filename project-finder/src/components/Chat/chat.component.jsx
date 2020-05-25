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
import {messagesFromProjectStart} from '../../redux/chat/chat.action';
import {selectMessageOfProject} from '../../redux/chat/chat.selectors';
import {selectMessageLoading} from '../../redux/chat/chat.selectors';

let socket;

const Chat = ({ currentUser, location, messagesFromProjectStart, messagesOfProject, messageLoading }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id, project } = queryString.parse(location.search);
    const { name } = currentUser;

    //Joining user(socket) to the room when click.
    useEffect(() => {
        socket = io('localhost:2500');

        //Making chat empty.
        setMessages([]);

        socket.emit('join', {id});

        return () => { //hook unmount
            socket.off();
        }
    }, [location.search]); 

    //Setting message from all users of room.
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

    //Getting chat history on url change.
    useEffect(() => {
        messagesFromProjectStart(id);
    }, [location.search])

    //Setting chat history.
    useEffect(() => {
        setMessages(messagesOfProject);
    }, [messagesOfProject]);

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
    messagesOfProject: selectMessageOfProject,
    messageLoading: selectMessageLoading
})

const mapDispatchToProps = dispatch => ({
    messagesFromProjectStart: (id) => dispatch(messagesFromProjectStart(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));