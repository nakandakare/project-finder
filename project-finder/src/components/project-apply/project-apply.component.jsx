import React from 'react';
import './project-apply.styles.scss';
import { Button, Header, Icon, Modal, Form, TextArea } from 'semantic-ui-react';

const ProjectApply = ({ showApplyModal, setShowApplyModal, selectedProjectName }) => {

    const closeHandler = () => {
        setShowApplyModal(false)
    }

    return (
        <Modal open={showApplyModal} closeIcon size='small' onClose={closeHandler} className='applyModal'>
            <Header icon='project' size='medium' className='projectApplyHeader' content='Apply To Project' />
            <Modal.Content>
                <div className='applyModalTextTitle'>
                    Project Name: 
                    <h3 className='modalProjectName'>{selectedProjectName}</h3>
                </div>
                <div className='applyModalTextNote'>
                    Additional notes:  
                    <Form className='applyModalTextArea'>
                        <TextArea placeholder='Write something about yourself ' />
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions className='modalFooter'>
                <Button size='tiny' color='red' basic onClick={closeHandler}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button size='tiny' color='green'>
                    <Icon name='checkmark' /> Apply
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ProjectApply;