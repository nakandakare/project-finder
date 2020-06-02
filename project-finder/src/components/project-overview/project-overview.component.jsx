import React, {useState} from 'react';
import './project-overview.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectProjects} from '../../redux/project/project.selectors';
import { connect } from 'react-redux';
import ProjectItem from '../project-item/project-item.component';
import ProjectApply from '../project-apply-modal/project-apply.component';
import NotAllowedModal from '../not-allowed-modal/not-allowed-modal.component';

const ProjectOverview = ({ projects, projectCount }) => {

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showNotAllowedModal, setShowNotAllowedModal] = useState(false);
    const [selectedProjectName, setProjectName] = useState('');

    const [applyProjectData, setApplyProjectData] = useState({ projectId: '', projectOwnerId: '', requestUserId: '', projectName: '', note:''});

    return (
        <div className='project-overview'>
            <ProjectApply showApplyModal={showApplyModal} setShowApplyModal={setShowApplyModal} selectedProjectName={selectedProjectName} setApplyProjectData={setApplyProjectData} applyProjectData={applyProjectData} />
            <NotAllowedModal title={'Not Allowed'} text={'Please sign in or register to apply to the projects'} showNotAllowedModal={showNotAllowedModal} setNotAllowedModal={setShowNotAllowedModal}/>
            <header className='available-header'>
                <span className='available-text'>{projectCount[0].count} Available Projects Found:</span>
            </header>
            {
                projects.map(({ ...otherCollectionProps }, i) => (<ProjectItem key={i} {...otherCollectionProps} setShowApplyModal={setShowApplyModal} setNotAllowedModal={setShowNotAllowedModal} setProjectName={setProjectName} setApplyProjectData={setApplyProjectData} applyProjectData={applyProjectData}/>))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
})

export default connect(mapStateToProps)(ProjectOverview);