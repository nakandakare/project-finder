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
import { messagesFromProjectStart, newMessage } from '../../redux/chat/chat.action';
import { selectMessageOfProject, selectMessageLoading } from '../../redux/chat/chat.selectors';

let socket;

const Chat = ({ currentUser, location, messagesFromProjectStart, messagesOfProject}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id, project } = queryString.parse(location.search);
    const { name } = currentUser;
    const ENDPOINT = 'localhost:2500'

    //Joining user(socket) to the room when click.
    useEffect(() => {
        socket = io(ENDPOINT);
        //Making chat empty.
        setMessages([]);

        socket.emit('join', { id });

        return () => { //hook unmount
            socket.off();
        }
    }, [ENDPOINT,location.search]);

    //Getting chat history on url change.
    useEffect(() => {
        messagesFromProjectStart(id);
    }, [location.search])

    //Setting chat history.
    useEffect(() => {
        setMessages(messagesOfProject);
    }, [messagesOfProject]);

    //Setting message from all users of room.
    useEffect(() => {
        /*TIENE QUE SER SOCKET.ONCE YA QUE SI ES CON SOCKET.ON 
        CADA VEZ QUE LLAMO ESTA FUNCION,
        SE VA ADICIONANDO SOCKET.ON
        
        SOCKET.ON IS ACCUMULABLE.
        */
        socket.once('message', (messageFromServer) => {
            setMessages([...messages, messageFromServer]);
        })
    }, [messages]);

    // function for sending messages
    const sendMessage = (event) => {
        if (message) {
            event.preventDefault();
            socket.emit('sendMessage', { message, name, id }, () => { 
                setMessage(''); 
            })
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={project} projectId={id}/>
                <Messages messages={messages} id={id} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
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