import React, { useEffect} from 'react';
import './chat.styles.scss';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const Chat = ({currentUser, location}) => {
    const {id} = queryString.parse(location.search);
    useEffect(() => {
        const { name } = currentUser;
        
        const socket = io('localhost:2500');
        socket.emit('join', {name});
    }, []) 

    return (
        <h1>{id}</h1>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
})

export default withRouter(connect(mapStateToProps)(Chat));