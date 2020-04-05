import React from 'react';
import './projects-page.styles.scss';
import Filter from '../../components/filter/filter.component';
import ProjectOverviewContainer from '../../components/project-overview/project-overview.container';
const ProjectsPage = () => {
    return(
        <div className='projects-page'>
            <Filter className='projects-filter'/>
            <ProjectOverviewContainer/>        
        </div>
    )
} 


export default ProjectsPage;