import React, { useEffect} from 'react';
import './chat.styles.scss';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { selectProjectFromUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Chat = ({ currentUser}) => {

    useEffect(() => {
        const { name } = currentUser;
        
        const socket = io('localhost:2500');
        socket.emit('join', {name});
    }, []) 

    return (
        <h1>Chat</h1>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(Chat);