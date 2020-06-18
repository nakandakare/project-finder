import React, { useState, useEffect } from 'react';
import './notification.styles.scss';
import { selectShowNotification, selectProjectsApplied, selectProjectsRequest, selectCurrentUser } from '../../redux/user/user.selectors'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux';
import ProjectApplied from '../../components/project-applied/project-applied.component';
import ProjectRequest from '../../components/project-request/project-request.component';
import ScrollToBottom from 'react-scroll-to-bottom';
import applyIcon from '../../assets/notification-apply.png'
import groupIcon from '../../assets/notification-group.png'
import _ from 'lodash';
import { notifySocket } from '../../constants/constants';
import { addProjectRequest, addNotificationCount, changeAppliedStatus  } from '../../redux/user/user.actions';

const Notification = ({ showNotification, projectsApplied, projectsRequest, currentUser, addProjectRequest, addNotificationCount, changeAppliedStatus }) => {

    const [filterValue, setFilterValue] = useState(undefined);

    if (filterValue) {
        projectsRequest.splice(filterValue, 1)
        setFilterValue(undefined); 
    } else if (filterValue === 0 ){
        projectsRequest.shift();
        setFilterValue(undefined);
    }
    
    //Using same socket of project-apply.component & project-request.component
    useEffect(() => {   
        if(currentUser){
        notifySocket.emit('join', {id: currentUser.id});
        }
    }, [currentUser])

    useEffect(() => {
        notifySocket.on('projectRequest', (projectRequestFromServer) => {
            addProjectRequest(projectRequestFromServer);  //user action
            addNotificationCount();
        });
    }, [])

    useEffect(() => {
        notifySocket.on('requestAcceptOrDecline', (requestValue) => {
            changeAppliedStatus(requestValue); //user action
            addNotificationCount();
        });
    }, [])

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
                                <ScrollToBottom className='scrollStyles' mode='top'>
                                    {
                                        !_.isEmpty(projectsApplied)
                                            ?
                                            projectsApplied.map(({ ...props }, i) => <ProjectApplied key={i} {...props} />)
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
                            <div>
                                <ScrollToBottom className='scrollStyles' mode='top'>
                                    <Card.Group className='requestItems'>
                                        {
                                            !_.isEmpty(projectsRequest)
                                                ?
                                                projectsRequest.map(({ ...props }, i) => <ProjectRequest key={i} {...props} setFilterValue={setFilterValue} index={i} />)
                                                :
                                                <div className='noContent secondNoContent'>
                                                    <img className='notificationIcon' src={groupIcon} />
                                                    <p className='notificationIconText'>Request empty</p>
                                                </div>
                                        }
                                    </Card.Group>
                                </ScrollToBottom>
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
    projectsApplied: selectProjectsApplied(state),
    projectsRequest: selectProjectsRequest(state),
    currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
    addProjectRequest: (value) => dispatch(addProjectRequest(value)),
    changeAppliedStatus: (value) => dispatch(changeAppliedStatus (value)),
    addNotificationCount: () => dispatch(addNotificationCount())
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);