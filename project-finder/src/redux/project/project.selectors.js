import { createSelector } from 'reselect';

const selectProject = state => state.project;

export const selectProjects = createSelector(
    [selectProject],
    project => project.projects
)
export const selectProjectCount = createSelector(
    [selectProject],
    project => project.projectCount
)
export const selectIsFetching = createSelector(
    [selectProject],
    project => project.isFetching
)
export const selectProjectMembers = createSelector(
    [selectProject],
    project => project.projectMembers
)
export const selectProjectsApplied = createSelector(
    [selectProject],
    project => project.projectsApplied
)




