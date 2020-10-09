import React from 'react';
import './project-item.styles.scss';
import FlagIcon from '../../utils/flag-icon-factory';
import ReadMoreAndLess from 'react-read-more-less';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import UserPicture from '../user-picture/user-picture.component';
import { selectProjectFromUser, selectProjectsApplied } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const ProjectItem = ({ projectId, projectname, description, size, duration, members, language, proglanguage, created_at, name, img, flag, category, projectsFromUser, setShowApplyModal, setNotAllowedModal, setProjectName, currentUser, userId, setApplyProjectData, applyProjectData, projectsApplied }) => {

    var showApplyButton = true;

    //Merging two array into one to find which projects user has Applied and Created, and then dont show apply button of that projects.
    var noApplyButtonProject = [...projectsApplied, ...projectsFromUser];
   
    if (!(noApplyButtonProject.length < 1)) {
        if (noApplyButtonProject.find(project => project.projectId === projectId)) {
            showApplyButton = false;
        }
    }

    const applyClicked = () => {
        if (currentUser) {
            setProjectName(projectname);
            setShowApplyModal(true);
            setApplyProjectData({ ...applyProjectData, projectId, projectOwnerId: userId, requestUserId: currentUser.id, projectName: projectname })
        } else {
            setNotAllowedModal(true);
        }
    }

    const created = created_at.substring(0, created_at.indexOf('T'));
    return (
        <div className='project'>
            <div className='projectItem'>
                <div className='projectSidebar'>
                    <div className='userSection'>
                        <UserPicture img={img} width={'90px'} />
                        <div className='userName'>
                            <span className='name'>{name.toUpperCase()}</span>
                            <FlagIcon className='flag' code={flag.toLowerCase()} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='projectDetail'>
                        <div className='projectNameButtonRow'>
                            <div className='projectName'>
                                <span className='projectLabel'>Project Name: </span>
                                <span className='projectTitle'>{projectname.split(' ').map(name => name.charAt(0).toUpperCase() + name.substring(1)).join(' ')}</span>
                            </div>
                            <div className='projectCreatedButtonEnd'>
                                <div className='createdAt'>
                                    {created}
                                </div>
                                <div className='applyButton'>
                                    {
                                        showApplyButton ?
                                            <Button
                                                onClick={applyClicked}
                                                variant="contained"
                                                color="primary"
                                                className='iconButton'
                                                size='small'
                                                endIcon={<Icon>group</Icon>}
                                            >
                                                APPLY
                                            </Button>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='projectDescription'>
                            <span className='spanAddMargin'>Description: </span>
                            <div className='readmoreDiv'>
                                <ReadMoreAndLess charLimit={140}
                                    readMoreText="more"
                                    readLessText="less">{description}
                                </ReadMoreAndLess>
                            </div>
                            <div className='hrDiv firstHrDiv' />
                            <div className='columnBox'>
                                <div className='firstColumn'>
                                    <div className='firstRow'>
                                        <span className='spanAddMargin'>Project Category</span>
                                        <span>{category}</span>
                                    </div>
                                    <div className='secondRow'>
                                        <span className='spanAddMargin'>Looking For</span>
                                        <span>{members} Member(s)</span>
                                    </div>
                                </div>
                                <div className='secondColumn'>
                                    <div className='firstRow'>
                                        <span className='spanAddMargin'>Project Duration</span>
                                        <span>{duration} Month</span>
                                    </div>
                                    <div className='secondRow'>
                                        <span className='spanAddMargin'>Language</span>
                                        <span>{language.charAt(0).toUpperCase() + language.substring(1)}</span>
                                    </div>
                                </div>
                                <div className='third-Column'>
                                    <div className='firstRow'>
                                        <span className='spanAddMargin'>Project Size</span>
                                        <span>{size}</span>
                                    </div>
                                    <div className='secondRow'>
                                        <span className='spanAddMargin'>Prog. Language</span>
                                        <span>{proglanguage.charAt(0).toUpperCase() + proglanguage.substring(1)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    projectsFromUser: selectProjectFromUser(state),
    currentUser: selectCurrentUser(state),
    projectsApplied: selectProjectsApplied(state)
})

export default connect(mapStateToProps)(ProjectItem);