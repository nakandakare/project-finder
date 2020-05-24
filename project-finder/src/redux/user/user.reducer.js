import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isFetching: false, //to show spinner.
    userProjects: []
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
        default:
            return state;
    }
}

export default userReducer;