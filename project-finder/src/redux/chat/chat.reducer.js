import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
    messagesOfProject: [],
    loadingMessages: false,
    error: null
}

const chatReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ChatActionTypes.MESSAGES_FROM_PROJECT_START: 
        return {
            ...state,
            loadingMessages: true
        }
        case ChatActionTypes.MESSAGES_FROM_PROJECT_SUCCESS:
            return {
                ...state,
                messagesOfProject: action.payload,
                loadingMessages: false
            }
        case ChatActionTypes.CHAT_ERROR:
            return {
                error: action.payload,
                loadingMessages: false
            }
        default:
            return state;
    }
}

export default chatReducer;