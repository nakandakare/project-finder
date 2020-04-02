import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess } from './user.actions';
import { URL } from '../../constants/constants';

const postRequest = (url, payload) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }).then(res => res.json())
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

//WATCHERS
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onRegisterStart() {
    yield takeLatest(UserActionTypes.REGISTER_START, registerWithEmail)
}

//to export all functions.
export function* userSagas() {
    yield all([call(onEmailSignInStart), call(onRegisterStart)])
}