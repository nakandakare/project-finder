import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isFetching: false //to show spinner.
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_START:
        case UserActionTypes.REGISTER_START: 
            return {
                ...state,
                isFetching: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS: 
            return {
                ...state,
                currentUser: action.payload,
                isFetching: false,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE: 
            return {
                ...state,
                isFetching: false,
                error: action.paylod
            }
        default:
            return state;
    }
}

export default userReducer;