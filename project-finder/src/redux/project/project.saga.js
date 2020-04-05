import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProjectActionTypes from './project.types';
import { projectAddSuccess, projectFailure, projectFetchSuccess } from './project.action';
import { URL } from '../../constants/constants';
import { postRequest, getRequest } from '../../utils/fetch-request';

export function* projectAdd({ payload }) {
    try {
        yield all([
            postRequest(URL.API_PROJECT, payload),
            put(projectAddSuccess())
        ]);
    } catch (err) {
        yield put(projectFailure(err));
    }
}

export function* projectFetch(){
    try{
        const projects = yield getRequest(URL.API_PROJECT);
        yield put(projectFetchSuccess(projects))
    }catch(err){
        yield put(projectFailure(err));
    }
}

//WATCHERS
export function* onProjectAddStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_ADD_START, projectAdd)
}

export function* onProjectFetchStart(){
    yield takeLatest(ProjectActionTypes.PROJECT_FETCH_START, projectFetch)
}

//to export all functions.
export function* projectSagas() {
    yield all([call(onProjectAddStart), call(onProjectFetchStart)])
}