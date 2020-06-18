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

export const addNotificationCount = () => ({
    type: UserActionTypes.ADD_NOTIFICATION_COUNT
})

export const emptyNotificationCount = () => ({
    type: UserActionTypes.EMPTY_NOTIFICATION_COUNT
})

export const showHideNotification = () => ({
    type: UserActionTypes.SHOW_HIDE_NOTIFICATION
})

export const hideNotification = () => ({
    type: UserActionTypes.HIDE_NOTIFICATION
})

export const getNotificationDataStart = () => ({
    type: UserActionTypes.GET_NOTIFICATION_DATA_START,
})

export const getNotificationSuccess = (notification) => ({
    type: UserActionTypes.GET_NOTIFICATION_SUCCESS,
    payload: notification
})

export const getNotificationRequestSuccess = (requestNotification) => ({
    type: UserActionTypes.GET_NOTIFICATION_REQUEST_SUCCESS,
    payload: requestNotification
})

export const addProjectApplied = (projectApplied) => ({
    type: UserActionTypes.ADD_PROJECT_APPLIED,
    payload: projectApplied
})

export const addProjectRequest = (projectRequest) => ({
    type: UserActionTypes.ADD_PROJECT_REQUEST,
    payload: projectRequest
})

export const saveUserToProject = (value) => ({
    type: UserActionTypes.SAVE_USER_TO_PROJECT,
    payload: value
})

export const declileRequest = (value) => ({
    type: UserActionTypes.DECLIE_PROJECT_REQUEST,
    payload: value
})

export const changeAppliedStatus = (value) => ({
    type: UserActionTypes.CHANGE_APPLY_STATUS,
    payload: value
})
