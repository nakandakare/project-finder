import { createSelector } from 'reselect';

const selectChat = state => state.chat;

export const selectMessageOfProject = createSelector( 
    [selectChat],
    chat => chat.messagesOfProject
)

export const selectMessageLoading = createSelector(
    [selectChat],
    chat => chat.loadingMessages
)

export const selectLastMessages = createSelector(
    [selectChat],
    chat => chat.lastMessages
)
