import ProjectActionTypes from './project.types';

export const projectAddStart = (projectData) => ({
    type: ProjectActionTypes.PROJECT_ADD_START,
    payload: projectData
})

export const projectAddSuccess = () => ({
    type: ProjectActionTypes.PROJECT_ADD_SUCCESS
})

export const projectFetchStart = (offset) => ({
    type: ProjectActionTypes.PROJECT_FETCH_START,
    payload: offset
})

export const projectFetchSuccess = (projects) => ({
    type: ProjectActionTypes.PROJECT_FETCH_SUCCESS,
    payload: projects
})

export const projectFailure = (err) => ({
    type: ProjectActionTypes.PROJECT_ADD_FAILURE,
    payload: err
}) 

export const projectFilterAddStart = (projectFilter) => ({
    type: ProjectActionTypes.PROJECT_FILTERED_ADD_START,
    payload: projectFilter
})

export const projectMemberFetchStart = (id) => ({
    type: ProjectActionTypes.PROJECT_FETCH_MEMBERS_START,
    payload: id
})

export const projectMemberFetchSuccess = (members) => ({
    type: ProjectActionTypes.PROJECT_FETCH_MEMBERS_SUCCESS,
    payload: members
})

export const emptyProjectMembers = () => ({
    type: ProjectActionTypes.EMPTY_PROJECT_MEMBERS
})

export const projectCountSuccess = (count) => ({
    type: ProjectActionTypes.PROJECT_COUNT_SUCCESS,
    payload: count
})

export const projectApplyStart = (projectApplyData) => ({
    type: ProjectActionTypes.PROJECT_APPLY_START,
    payload: projectApplyData
})
export const projectApplySuccess = () => ({
    type: ProjectActionTypes.PROJECT_APPLY_SUCCESS
})