import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProjectActionTypes from './project.types';
import { projectAddSuccess, projectFailure, projectFetchSuccess, projectMemberFetchSuccess, projectCountSuccess, projectApplySuccess  } from './project.action';
import { addProjectApplied} from '../user/user.actions';
import { addNotificationCount } from '../user/user.actions';
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

export function* projectFetch({payload}){
    try{
        const projects = yield postRequest(URL.API_PROJECT, payload); //payload = offset    
        const projectCount = yield getRequest(URL.API_PROJECT_COUNT);
        yield put(projectCountSuccess(projectCount))
        yield put(projectFetchSuccess(projects))
    }catch(err){
        yield put(projectFailure(err));
    }
}

export function* projectMembersFetch({payload}){
    if(payload !== undefined) {
        const resp = yield postRequest(URL.API_PROJECT_MEMBERS, {'projectId': payload});
        if(resp.error){
            projectFailure(resp);
        }
        yield put(projectMemberFetchSuccess(resp));
    }
}

export function* projectApplySave({ payload }) {
    const resp = yield postRequest(URL.API_PROJECT_APPLY, payload);
    if(resp.name == "error") {
        yield put(projectFailure(resp));
        alert('Error applying to project');
    } else {
        yield put(projectApplySuccess());
        yield put(addProjectApplied(resp));
        yield put(addNotificationCount());
    }
}

export function* getNotificationData(payload) {
    console.log(payload);
}

//WATCHERS
export function* onProjectAddStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_ADD_START, projectAdd)
}

export function* onProjectFetchStart(){
    yield takeLatest(ProjectActionTypes.PROJECT_FETCH_START, projectFetch)
}

export function* onProjectMembersFetchStart(){
    yield takeLatest(ProjectActionTypes.PROJECT_FETCH_MEMBERS_START, projectMembersFetch)
}

export function* onProjectApplyStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_APPLY_START, projectApplySave)
}


//to export all functions.
export function* projectSagas() {
    yield all([call(onProjectAddStart), call(onProjectFetchStart), call(onProjectMembersFetchStart), call(onProjectApplyStart)])
}