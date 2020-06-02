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

export const selectNotificationCount = createSelector(
    [selectUser],
    user => user.notificationCount
)

export const selectShowNotification = createSelector(
    [selectUser],
    user => user.showNotification
)

export const selectProjectsApplied = createSelector(
    [selectUser],
    user => user.projectsApplied
)