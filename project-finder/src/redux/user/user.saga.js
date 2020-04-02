import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess} from './user.actions';
import {URL} from '../../constants/constants';

export function* signInWithEmail({payload}) {
    try {
        const user = yield fetch(URL.API_SIGNIN, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json())
        yield put(signInSuccess(user));
    }catch(err){
        yield put(signInFailure(err));
    }
}

//WATCHERS
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() { //to export all functions.
    yield all([call(onEmailSignInStart)])
}