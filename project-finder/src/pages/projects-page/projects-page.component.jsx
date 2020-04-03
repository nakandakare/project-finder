import React from 'react';
import './projects-page.styles.scss';
import ProjectItem from '../../components/project-item/project-item.component';
import Filter from '../../components/filter/filter.component';

const ProjectsPage = () => {
    return(
        <div className='projects-page'>
            <Filter className='projects-filter'/>
            <ProjectItem/>        
        </div>
    )
} 

export default ProjectsPage;