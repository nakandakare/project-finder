import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, logoutSuccess, setCurrentUser, logoutFailure, projectFetchFromUserSuccess, getNotificationDataStart, getNotificationSuccess } from './user.actions';
import { URL } from '../../constants/constants';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { postRequest, getRequest } from '../../utils/fetch-request';

export function* signInWithEmail({ payload }) {
    const resp = yield call(postRequest, [URL.API_SIGNIN, payload]);
    if (resp.id) {
        yield storeUser(resp);
        yield put(signInSuccess(resp));
    } else {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp));
    }
}

export function* registerWithEmail({ payload }) {
    const resp = yield call(postRequest, [URL.API_REGISTER, payload]);
    if (resp.id) {
        yield storeUser(resp);
        yield put(signInSuccess(resp))
    } else {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp))  
    }
}

export function* storeUser(resp) {
    const cookies = new Cookies();
    cookies.set('us', resp, { expires: resp.keepSignIn ? new Date(Date.now() + 315360000000) : null });
}

export function* logout() {
    const cookies = new Cookies();
    const {message} = yield getRequest(URL.API_LOGOUT);
    if(message) {
        cookies.remove('us');
        yield put(logoutSuccess());
    } else {
        yield put(logoutFailure({err: 'logout failed'}));
    }
}

export function* checkUserSession() {
    const cookies = new Cookies();
    const user = cookies.get('us');
    if (user) {
        const { id } = user;
        //Getting projects of user
        yield getProjectsOfUser(user);
        //Getting notification data of user
        yield getNotificationsOfUser(id);
        //Setting user information
        yield put(setCurrentUser(user));
    } else {
        return
    }
}

export function* getProjectsOfUser(user) {
    const userProjects = yield call(postRequest, [URL.API_PROJECT_USER, user]);
    //Setting projects of user
    yield put(projectFetchFromUserSuccess(userProjects));
}

export function* getNotificationsOfUser(id) {
    yield put(getNotificationDataStart());
    const projectsApplied = yield call(postRequest, [URL.API_PROJECT_APPLIED, { id }]);
    const projectsRequest = yield call(postRequest, [URL.API_PROJECT_REQUEST, { id }]);
    yield put(getNotificationSuccess([projectsApplied, projectsRequest]));
}

export function* fetchProjectFromUser({payload}) {
    const resp = yield call(postRequest, [URL.API_PROJECT_USER, payload]);
    const projectsId = resp.map(projectId => projectId.projectId);
    yield put(projectFetchFromUserSuccess(projectsId));
}

export function* saveUserToProject({payload}) {
    yield postRequest(null, URL.API_USER_TO_PROJECT, payload);
}

export function* declineRequest({payload}) {
    yield postRequest(null, URL.API_DECLINE_REQUEST, payload);
}

export function* sendContactData({payload}) {
    yield postRequest(null, URL.API_MAIL, payload);
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

export function* onSaveUserToProject() {
    yield takeLatest(UserActionTypes.SAVE_USER_TO_PROJECT, saveUserToProject);
}

export function* onDeclineRequest() {
    yield takeLatest(UserActionTypes.DECLIE_PROJECT_REQUEST, declineRequest);
}

export function* onSendContactData() {
    yield takeLatest(UserActionTypes.SEND_CONTACT_DATA, sendContactData);
}

//to export all functions.
export function* userSagas() {
    yield all([call(onEmailSignInStart), call(onRegisterStart), call(onLogout), call(onCheckUserSession), call(onProjectFetchFromUser), call(onSaveUserToProject), call(onDeclineRequest), call(onSendContactData)])
}