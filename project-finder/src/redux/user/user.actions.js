import UserActionTypes from './user.types';

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const registerStart = (userCredentials) => ({
    type: UserActionTypes.REGISTER_START,
    payload: userCredentials
})

export const logoutStart = () => ({
    type: UserActionTypes.LOGOUT_START
})

export const logoutSuccess = () => ({
    type: UserActionTypes.LOGOUT_SUCCESS
})

export const logoutFailure = (err) => ({
    type:UserActionTypes.LOGOUT_FAILURE,
    payload:err
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const setCurrentUser = (data) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: data
})

export const projectFetchFromUserStart = (userId) => ({
    type: UserActionTypes.PROJECT_FETCH_USER,
    payload: userId
})

export const projectFetchFromUserSuccess = (data) => ({
    type: UserActionTypes.PROJECT_FETCH_USER_SUCCESS,
    payload: data
})