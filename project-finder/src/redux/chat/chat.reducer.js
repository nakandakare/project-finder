import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
    messagesOfProject: [],
    lastMessages: [],
    loadingMessages: false,
    loadingLastMessages: false,
    newMessageObserver: true,
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
                ...state,
                error: action.payload,
                loadingMessages: false
            }
        case ChatActionTypes.LAST_MESSAGE_START: 
            return {
                ...state,
                loadingLastMessages: true
            }
        case ChatActionTypes.LAST_MESSAGE_SUCCESS:
            return {
                ...state,
                lastMessages: action.payload
            }
        case ChatActionTypes.NEW_LAST_MESSAGE:
            const newLastMessage = state.lastMessages.map(message => 
                action.payload.find(newLastMessage => (newLastMessage.projectId === message.projectId)) || message)
            return {
                ...state,
                lastMessages: newLastMessage
            }
        default:
            return state;
    }
}

export default chatReducer;