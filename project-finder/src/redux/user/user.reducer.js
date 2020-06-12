import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: '',
    isFetching: false, //to show spinner.
    userProjects: [],
    filterValue: '',
    notificationCount: 0,
    showNotification: false,
    isNotificationLoading: false,
    projectsApplied: [],
    projectsRequest: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_START:
        case UserActionTypes.REGISTER_START: 
        case UserActionTypes.LOGOUT_START:
        case UserActionTypes.PROJECT_FETCH_USER:
            return {
                ...state,
                isFetching: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: action.payload,
                isFetching: false,
                error: null
            }
        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isFetching: false,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE: 
            return {
                ...state,
                isFetching: false,
                error: action.paylod
            }
        case UserActionTypes.PROJECT_FETCH_USER_SUCCESS:
            return {
                ...state,
                userProjects: action.payload,
                isFetching: false
            }
        case UserActionTypes.ADD_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: state.notificationCount + 1
            }
        case UserActionTypes.EMPTY_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: 0
            }
        case UserActionTypes.SHOW_HIDE_NOTIFICATION:
            return {
                ...state,
                showNotification: !state.showNotification
            }   
        case UserActionTypes.HIDE_NOTIFICATION:
            return {
                ...state,
                showNotification: false
            }
        case UserActionTypes.GET_NOTIFICATION_DATA_START:
            return {
                ...state,
                isNotificationLoading: true
            }
        case UserActionTypes.ADD_PROJECT_APPLIED:
            return {
                ...state,
                projectsApplied: [...state.projectsApplied, action.payload[0]]
            }
        case UserActionTypes.GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                projectsApplied: action.payload[0],
                projectsRequest: action.payload[1]
            }
        default:
            return state;
    }
}

export default userReducer;