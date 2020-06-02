import { createSelector } from 'reselect';
import {jsonToArray} from '../../utils/json-to-array';
import _ from 'lodash';

const selectProject = state => state.project;

export const selectProjects = createSelector(
    [selectProject],
    project => {
        const {projects, projectFilter} = project;
        const projectsArray = jsonToArray(projects)
        const projectsArrayToFilter = projectsArray;
        if(_.isEmpty(projectFilter)){
            return projectsArray;
        } else {
            return projectsArrayToFilter.filter(project => {
                for(let key in projectFilter){
                    if(project[key] !== projectFilter[key]){
                        return false;
                    }
                }
                return true;
            })
        }
    }
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




