import ProjectActionTypes from './project.types';

const INITIAL_STATE = {
    projects: null,
    isFetching: false,
    createShow: false
}

const projectReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ProjectActionTypes.PROJECT_ADD_START:
        case ProjectActionTypes.PROJECT_FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case ProjectActionTypes.PROJECT_ADD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                err: null
            }
        case ProjectActionTypes.PROJECT_FETCH_SUCCESS:
            return {
                ...state,
                projects: action.payload,
                err: null,
                isFetching: false
            }
        case ProjectActionTypes.PROJECT_ADD_FAILURE:
        case ProjectActionTypes.PROJECT_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case ProjectActionTypes.PROJECT_CREATE_SHOW:
            return {
                ...state,
                createShow: true
            }
        case ProjectActionTypes.PROJECT_CREATE_CLOSE:
            return {
                ...state,
                createShow: false
            }
        default:
            return state;
    }
}

export default projectReducer;