import React from 'react';
import './notification.styles.scss';
import { selectShowNotification, selectProjectsApplied } from '../../redux/user/user.selectors'
import { Button, Card, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import ProjectApplied from '../../components/project-applied/project-applied.component';
import ScrollToBottom from 'react-scroll-to-bottom';
import applyIcon from '../../assets/notification-apply.png'
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
                                <ScrollToBottom className='scrollStyles' mode='top'>
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
                            <div>
                                <ScrollToBottom className='scrollStyles' mode='top'>
                                    <Card.Group className='requestItems'>
                                        <Card>
                                            <Card.Content>
                                                <Image
                                                    floated='right'
                                                    size='mini'
                                                    src='https://robohash.org/ds'
                                                />
                                                <Card.Header>Steve Sanders</Card.Header>
                                                <Card.Meta>Friends of Elliot</Card.Meta>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button basic color='green'>
                                                        Approve
                                                </Button>
                                                    <Button basic color='red'>
                                                        Decline
                                                </Button>
                                                </div>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content>
                                                <Image
                                                    floated='right'
                                                    size='mini'
                                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                                />
                                                <Card.Header>Steve Sanders</Card.Header>
                                                <Card.Meta>Friends of Elliot</Card.Meta>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button basic color='green'>
                                                        Approve
                                                </Button>
                                                    <Button basic color='red'>
                                                        Decline
                                                </Button>
                                                </div>
                                            </Card.Content>
                                        </Card>
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
    projectsApplied: selectProjectsApplied(state)
})

export default connect(mapStateToProps)(Notification);