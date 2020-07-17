import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProjectActionTypes from './project.types';
import { projectAddSuccess, projectFailure, projectFetchSuccess, projectMemberFetchSuccess, projectCountSuccess, projectApplySuccess } from './project.action';
import { addProjectApplied } from '../user/user.actions';
import { addNotificationCount } from '../user/user.actions';
import { URL } from '../../constants/constants';
import { postRequest, getRequest } from '../../utils/fetch-request';

export function* projectFetch({ payload }) {
    const projects = yield call(postRequest, [URL.API_PROJECT, payload]);
    if (projects) {
        yield put(projectFetchSuccess(projects))
    } else {
        //insert no projects found error here
        yield put(projectFailure("error filtering projects"));
    }
}

export function* projectCount() {
    const projectCount = yield getRequest(URL.API_PROJECT_COUNT);
    yield put(projectCountSuccess(projectCount))
}

export function* projectMembersFetch({ payload }) {
    if (payload !== undefined) {
        const resp = yield call(postRequest, [URL.API_PROJECT_MEMBERS, { 'projectId': payload }]);
        if (resp.error) {
            projectFailure(resp);
        }
        yield put(projectMemberFetchSuccess(resp));
    }
}

export function* projectApplySave({ payload }) {
    const resp = yield call(postRequest, [URL.API_PROJECT_APPLY, payload]);
    if (resp.name == "error") {
        yield put(projectFailure(resp));
        alert('Error applying to project');
    } else {
        yield put(projectApplySuccess());
        console.log(resp[0] + 'SIJDJOASDJDSAOJOADISJOIJADSOIJOIJAOIJDS')
        yield put(addProjectApplied(resp[0]));
        yield put(addNotificationCount());
    }
}

export function* projectAdd({ payload }) {
    const project = yield call(postRequest, [URL.API_ADD_PROJECT, payload]);
    console.log(project);
    yield put(projectAddSuccess());
    window.location.reload(false);
}
//WATCHERS
export function* onProjectAddStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_ADD_START, projectAdd)
}

export function* onProjectFetchStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_FETCH_START, projectFetch)
}

export function* onProjectFilterStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_FILTER_START, projectFetch)
}

export function* onProjectMembersFetchStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_FETCH_MEMBERS_START, projectMembersFetch)
}

export function* onProjectApplyStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_APPLY_START, projectApplySave)
}

export function* onProjectCountStart() {
    yield takeLatest(ProjectActionTypes.PROJECT_COUNT_START, projectCount)
}

//to export all functions.
export function* projectSagas() {
    yield all([call(onProjectAddStart), call(onProjectFetchStart), call(onProjectMembersFetchStart), call(onProjectApplyStart), call(onProjectFilterStart), call(onProjectCountStart)])
}