import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, logoutSuccess, setCurrentUser } from './user.actions';
import { URL } from '../../constants/constants';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const postRequest = (url, payload) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }).then(res => res.json())
}

const getRequest = (url) => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then(res => res)
}

export function* signInWithEmail({ payload }) {
    try {
        const user = yield postRequest(URL.API_SIGNIN, payload);
        yield put(signInSuccess(user));
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* registerWithEmail({ payload }) {
    try {
        const user = yield postRequest(URL.API_REGISTER, payload)
        yield put(signInSuccess(user));
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* logout(){
    const resp = yield getRequest(URL.API_LOGOUT);
    yield put(logoutSuccess());
}

export function* checkUserSession(){
    const cookies = new Cookies();
    const token = cookies.get('token')
    if(token){  
        const decodedToken = jwt_decode(token);
        yield put(setCurrentUser(decodedToken));
    } else {
    return
    }
}
//WATCHERS
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onRegisterStart() {
    yield takeLatest(UserActionTypes.REGISTER_START, registerWithEmail)
}

export function* onLogout(){
    yield takeLatest(UserActionTypes.LOGOUT_START, logout);
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession);
}
//to export all functions.
export function* userSagas() {
    yield all([call(onEmailSignInStart), call(onRegisterStart), call(onLogout), call(onCheckUserSession)])
}