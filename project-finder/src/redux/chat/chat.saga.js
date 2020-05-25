import { takeLatest, put, all, call } from 'redux-saga/effects';
import ChatActionTypes from './chat.types';
import { messagesFromProjectSuccess, chatError } from './chat.action';
import { URL } from '../../constants/constants';
import { postRequest } from '../../utils/fetch-request';

export function* messagesFetch({payload}) {
    if(payload != undefined){
    const resp = yield postRequest(URL.API_CHAT_MESSAGES, {'projectId': payload });
    if(resp.error){
        chatError(resp.error);
    }
    yield put(messagesFromProjectSuccess(resp));
    }
}

//Watchers
export function* onMessagesFromProjectStart() {
    yield takeLatest(ChatActionTypes.MESSAGES_FROM_PROJECT_START, messagesFetch)
}

//to export all functions.
export function* chatSagas() {
    yield all([call(onMessagesFromProjectStart)])
}