import ChatActionTypes from './chat.types';

export const messagesFromProjectStart = (projectId) => ({
    type: ChatActionTypes.MESSAGES_FROM_PROJECT_START,
    payload: projectId
})

export const messagesFromProjectSuccess = (messages) => ({
    type: ChatActionTypes.MESSAGES_FROM_PROJECT_SUCCESS,
    payload: messages
})

export const chatError = (error) => ({
    type: ChatActionTypes.CHAT_ERROR,
    payload: error
})

export const lastMessageStart = (id) => ({
    type: ChatActionTypes.LAST_MESSAGE_START,
    payload: id
})

export const lastMessageSuccess = (lastMessages) => ({
    type: ChatActionTypes.LAST_MESSAGE_SUCCESS,
    payload: lastMessages
})