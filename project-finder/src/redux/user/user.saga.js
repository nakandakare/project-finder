import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, logoutSuccess, setCurrentUser, logoutFailure, projectFetchFromUserSuccess } from './user.actions';
import { URL } from '../../constants/constants';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { postRequest, getRequest } from '../../utils/fetch-request';

export function* signInWithEmail({ payload }) {
    const resp = yield postRequest(URL.API_SIGNIN, payload);
    if (resp.error) {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp));
    } else {
        yield put(signInSuccess(resp));
    }
}

export function* registerWithEmail({ payload }) {
    const resp = yield postRequest(URL.API_REGISTER, payload);
    if (resp.error) {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp))
    } else {
        yield put(signInSuccess(resp))
    }
}

export function* logout() {
    try {
        yield getRequest(URL.API_LOGOUT);
        yield put(logoutSuccess());
    } catch (err) {
        yield put(logoutFailure(err));
    }
}

export function* checkUserSession() {
    const cookies = new Cookies();
    const token = cookies.get('token')
    if (token) {
        const decodedToken = jwt_decode(token);
        const userProjects = yield postRequest(URL.API_PROJECT_USER, decodedToken);
        //setting projects of user
        yield put(projectFetchFromUserSuccess(userProjects));
        //setting user information
        yield put(setCurrentUser(decodedToken));
    } else {
        return
    }
}

export function* fetchProjectFromUser({payload}) {
    const resp = yield postRequest(URL.API_PROJECT_USER, payload);
    const projectsId = resp.map(projectId => projectId.projectId);
    yield put(projectFetchFromUserSuccess(projectsId));
}

//WATCHERS
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onRegisterStart() {
    yield takeLatest(UserActionTypes.REGISTER_START, registerWithEmail)
}

export function* onLogout() {
    yield takeLatest(UserActionTypes.LOGOUT_START, logout);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession);
}

export function* onProjectFetchFromUser() {
    yield takeLatest(UserActionTypes.PROJECT_FETCH_USER, fetchProjectFromUser);
}

//to export all functions.
export function* userSagas() {
    yield all([call(onEmailSignInStart), call(onRegisterStart), call(onLogout), call(onCheckUserSession), call(onProjectFetchFromUser)])
}