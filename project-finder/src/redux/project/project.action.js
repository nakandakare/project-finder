import ProjectActionTypes from './project.types';

export const projectAddStart = (projectData) => ({
    type: ProjectActionTypes.PROJECT_ADD_START,
    payload: projectData
})

export const projectAddSuccess = () => ({
    type: ProjectActionTypes.PROJECT_ADD_SUCCESS
})

export const projectFetchStart = () => ({
    type: ProjectActionTypes.PROJECT_FETCH_START
})

export const projectFetchSuccess = (projects) => ({
    type: ProjectActionTypes.PROJECT_FETCH_SUCCESS,
    payload: projects
})

export const projectFailure = (err) => ({
    type: ProjectActionTypes.PROJECT_ADD_FAILURE,
    payload: err
}) 

export const projectCreateShow = () => ({
    type: ProjectActionTypes.PROJECT_CREATE_SHOW
})

export const projectCreateClose = () => ({
    type: ProjectActionTypes.PROJECT_CREATE_CLOSE
})

export const projectFilterAddStart = (projectFilter) => ({
    type: ProjectActionTypes.PROJECT_FILTERED_ADD_START,
    payload: projectFilter
})