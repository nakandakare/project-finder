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
