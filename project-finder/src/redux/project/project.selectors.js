import { createSelector } from 'reselect';
import {jsonToArray} from '../../utils/json-to-array';

const selectProject = state => state.project;

export const selectProjects = createSelector(
    [selectProject],
    project => {
        const projects = jsonToArray(project.projects)
        return projects.filter(project => project);
    }
)
export const selectCreateShow = createSelector(
    [selectProject],
    project => project.createShow
)
export const selectIsFetching = createSelector(
    [selectProject],
    project => project.isFetching
)
export const selectProjectsAvailable = createSelector(
    [selectProjects],
    projects => projects.reduce((total,project) => project.available ? total+1 : total, 0)
)
