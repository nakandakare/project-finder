import React from 'react';
import './project-overview.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectProjectsAvailable } from '../../redux/project/project.selectors';
import {connect} from 'react-redux';
import ProjectItem from '../project-item/project-item.component';

const ProjectOverview = ({ projects, projectsAvailable}) => {
    console.log(projectsAvailable);
    return (
        <div className='project-overview'>
        <header className='available-header'>
                <span className='available-text'>{projectsAvailable} Available Projects Found:</span>
        </header>
        {
                projects.map(({ project_id, ...otherCollectionProps }) => (<ProjectItem key={project_id} {...otherCollectionProps}/>))
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
    projectsAvailable: selectProjectsAvailable
})

export default connect(mapStateToProps)(ProjectOverview);