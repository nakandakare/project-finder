import { createSelector } from 'reselect';
import {jsonToArray} from '../../utils/json-to-array';

const selectProject = state => state.project;

export const selectProjects = createSelector(
    [selectProject],
    project => jsonToArray(project.projects) 
)
export const selectCreateShow = createSelector(
    [selectProject],
    project => project.createShow
)
export const selectIsFetching = createSelector(
    [selectProject],
    project => project.isFetching
)

