import React from 'react';
import './with-project-skeleton.scss';
import ProjectSkeleton from '../project-skeleton/project-skeleton';

const WithProjectSkeleton = (WrappedComponent) => {
    const ProjectsSkeleton = ({ isFetching, ...otherProps }) => {
        return isFetching ? 
            <ProjectSkeleton />
            :
            <WrappedComponent {...otherProps}/>
    }

    return ProjectsSkeleton;
}

export default WithProjectSkeleton;