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
        yield put(signInSuccess(resp));
    } else {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp));
    }
}

export function* registerWithEmail({ payload }) {
    const resp = yield call(postRequest, [URL.API_REGISTER, payload]);
    if (resp.id) {
        yield put(signInSuccess(resp))
    } else {
        alert('Error: some fields are empty or invalid');
        yield put(signInFailure(resp))  
    }
}

export function* logout() {
    const {message} = yield getRequest(URL.API_LOGOUT);
    if(message) {
        yield put(logoutSuccess());
    } else {
        yield put(logoutFailure({err: 'logout failed'}));
    }
}

export function* checkUserSession() {
    const cookies = new Cookies();
    const token = cookies.get('token')
    if (token) {
        const decodedToken = jwt_decode(token);
        const { id } = decodedToken;
        //Getting projects of user
        yield getProjectsOfUser(decodedToken);
        //Getting notification data of user
        yield getNotificationsOfUser(id);
        //Setting user information
        yield put(setCurrentUser(decodedToken));
    } else {
        return
    }
}

export function* getProjectsOfUser(decodedToken) {
    const userProjects = yield call(postRequest, [URL.API_PROJECT_USER, decodedToken]);
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