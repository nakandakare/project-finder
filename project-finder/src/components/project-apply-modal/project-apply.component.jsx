import React from 'react';
import './project-apply.styles.scss';
import { Button, Header, Icon, Modal, Form, TextArea } from 'semantic-ui-react';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { projectApplyStart } from '../../redux/project/project.action';
import {connect} from 'react-redux';
import { notifySocket } from '../../constants/constants';

const ProjectApply = ({ showApplyModal, setShowApplyModal, selectedProjectName, setApplyProjectData, applyProjectData, projectApplyStart, currentUser}) => {

    const closeHandler = () => {
        setShowApplyModal(false);
    }

    const applyToProject = () => {
        projectApplyStart(applyProjectData);
        sendProjectApplied();
        setShowApplyModal(false);
    }

    const sendProjectApplied = () => {
        notifySocket.emit('sendProjectApplied', {...applyProjectData, img: currentUser.img, name: currentUser.name});
    }

    return (
        <Modal open={showApplyModal} closeIcon size='small' onClose={closeHandler} className='applyModal'>
            <Header size='medium' className='projectApplyHeader' content='Apply To Project' />
            <Modal.Content>
                <div className='applyModalTextTitle'>
                    Project Name: 
                    <h3 className='modalProjectName'>{selectedProjectName}</h3>
                </div>
                <div className='applyModalTextNote'>
                    Additional notes:  
                    <Form className='applyModalTextArea'>
                        <TextArea onChange={(event) => setApplyProjectData({ ...applyProjectData, note: event.target.value})} placeholder='Write something about yourself ' />
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions className='modalFooter'>
                <Button size='tiny' color='red' basic onClick={closeHandler}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button onClick={applyToProject} size='tiny' color='green'>
                    <Icon name='checkmark' /> Apply
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => ({
    projectApplyStart: (projectApplyData) => dispatch(projectApplyStart(projectApplyData)),
})

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectApply);