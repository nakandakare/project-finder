import { createSelector } from 'reselect';
import { jsonToArray } from '../../utils/json-to-array';

const selectChat = state => state.chat;

export const selectMessageOfProject = createSelector( 
    [selectChat],
    chat => chat.messagesOfProject
)

export const selectMessageLoading = createSelector(
    [selectChat],
    chat => chat.loadingMessages
)