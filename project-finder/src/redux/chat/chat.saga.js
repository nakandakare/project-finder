import { takeLatest, put, all, call } from 'redux-saga/effects';
import ChatActionTypes from './chat.types';
import { messagesFromProjectSuccess, lastMessageSuccess,chatError } from './chat.action';
import { URL } from '../../constants/constants';
import { postRequest } from '../../utils/fetch-request';

export function* messagesFetch({payload}) {
    if(payload !== undefined){
        const resp = yield call(postRequest, [URL.API_CHAT_MESSAGES, { 'projectId': payload }]);
    if(resp.error){
        chatError(resp.error);
    } else {
    yield put(messagesFromProjectSuccess(resp));
        }
    }
}

export function* lastMessageFetch({payload}) {
    const resp = yield call(postRequest, [URL.API_CHAT_LAST_MESSAGES, { 'id': payload }]);
    if (resp.error) {
        chatError(resp.error);
    }
    yield put(lastMessageSuccess(resp));
}

//Watchers
export function* onMessagesFromProjectStart() {
    yield takeLatest(ChatActionTypes.MESSAGES_FROM_PROJECT_START, messagesFetch)
}

export function* onLastMessageStart() {
    yield takeLatest(ChatActionTypes.LAST_MESSAGE_START, lastMessageFetch)
}

//to export all functions.
export function* chatSagas() {
    yield all([call(onMessagesFromProjectStart), call(onLastMessageStart)])
}