import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)

export const selectIsFetching = createSelector(
    [selectUser],
    user => user.isFetching
)

export const selectProjectFromUser = createSelector(
    [selectUser],
    user => user.userProjects
)
