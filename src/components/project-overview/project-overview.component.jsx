import React, {useState} from 'react';
import './project-overview.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/project/project.selectors';
import { connect } from 'react-redux';
import ProjectItem from '../project-item/project-item.component';
import ProjectApply from '../project-apply-modal/project-apply.component';
import NotAllowedModal from '../not-allowed-modal/not-allowed-modal.component';
import { Message } from 'semantic-ui-react'
import { projectFilterStart } from '../../redux/project/project.action';
import _ from 'lodash';

const ProjectOverview = ({ projects, projectCount, setProjectFilterData, projectFilterStart }) => {

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showNotAllowedModal, setShowNotAllowedModal] = useState(false);
    const [selectedProjectName, setProjectName] = useState('');
    const [applyProjectData, setApplyProjectData] = useState({ projectId: '', projectOwnerId: '', requestUserId: '', projectName: '', note:''});

    const resetFilter = () => {
        setProjectFilterData({ projectName: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '', durationSlider: 0, membersSlider: 0 });
        projectFilterStart({ offset: 0 });
    }

    return (
        <div className='project-overview'>
            <header className='available-header'>
                <span className='available-text'>{projectCount === undefined ? projectCount[0].count : 0} Available Projects Found:</span>
            </header>
            {
                _.isEmpty(projects) ? 
                <div className='noProjectsWarning'>
                    <Message warning>
                        <Message.Header>No projects found, try again using another filter</Message.Header>
                            <p className='resetFilterButton' onClick={resetFilter}>Reset Filter</p>
                    </Message>
                </div>
                :   
                projects.map(({ ...otherCollectionProps }, i) => (<ProjectItem key={i} {...otherCollectionProps} setShowApplyModal={setShowApplyModal} setNotAllowedModal={setShowNotAllowedModal} setProjectName={setProjectName} setApplyProjectData={setApplyProjectData} applyProjectData={applyProjectData}/>))
            }
            <ProjectApply showApplyModal={showApplyModal} setShowApplyModal={setShowApplyModal} selectedProjectName={selectedProjectName} setApplyProjectData={setApplyProjectData} applyProjectData={applyProjectData} />
            <NotAllowedModal title={'Not Allowed'} text={'Please sign in or register to apply to the projects'} showNotAllowedModal={showNotAllowedModal} setNotAllowedModal={setShowNotAllowedModal} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
})

const mapDispatchToProps = dispatch => ({
    projectFilterStart: (filteredProjectData) => dispatch(projectFilterStart(filteredProjectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);