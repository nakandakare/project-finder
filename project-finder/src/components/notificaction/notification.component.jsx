import React from 'react';
import './notification.styles.scss';
import { selectShowNotification, selectProjectsApplied } from '../../redux/user/user.selectors'
import { connect } from 'react-redux';
import ProjectApplied from '../../components/project-applied/project-applied.component';
import ScrollToBottom from 'react-scroll-to-bottom';
import applyIcon from '../../assets/notification-apply.png'
import bellIcon from '../../assets/notification-bell.png'
import groupIcon from '../../assets/notification-group.png'
import _ from 'lodash';

const Notification = ({ showNotification, projectsApplied }) => {
    console.log(projectsApplied);
    console.log(projectsApplied);
    return (
        <div className='notificationContainer'>
            {
                showNotification ?
                    <div className='notificationInnerContainer'>
                        <div className='firstRow h-220'>
                            <div className='titleRow'>
                                Notifications
                            </div>
                            <div className='projectsApplied'>
                                <ScrollToBottom className='scrollStyles'>
                                    {
                                        !_.isEmpty(projectsApplied) ? projectsApplied.map(({ ...props }, i) => <ProjectApplied key={i} {...props} />)
                                            :
                                            <div className='noContent'>
                                                <img className='notificationIcon' src={applyIcon} />
                                                <p className='notificationIconText'>Notifications empty</p>
                                            </div>
                                    }
                                </ScrollToBottom>
                            </div>
                        </div>
                        <div className='secondRow h-220'>
                            <div className='titleRow titleRowSecond'>
                                Requests to your projects
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    showNotification: selectShowNotification(state),
    projectsApplied: selectProjectsApplied(state)
})

export default connect(mapStateToProps)(Notification);