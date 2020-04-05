import React from 'react';
import './project-overview.styles.scss';
import {selectProjects} from '../../redux/project/project.selectors';
import {connect} from 'react-redux';
import ProjectItem from '../project-item/project-item.component';

const ProjectOverview = ({projects}) => {
    return (
        <div className='project-overview'>
        <header className='available-header'>
            <span className='available-text'>1 Available Projects Found:</span>
        </header>
        {
                projects.map(({ project_id, ...otherCollectionProps }) => (<ProjectItem key={project_id} {...otherCollectionProps}/>))
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    projects: selectProjects(state)
})

export default connect(mapStateToProps)(ProjectOverview);