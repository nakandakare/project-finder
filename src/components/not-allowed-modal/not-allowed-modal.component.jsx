import React from 'react';
import './not-allowed-modal.styles.scss';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
const NotAllowedModal = ({ title, text, showNotAllowedModal, setNotAllowedModal}) => {

    const closeNotAllowedModal = () => {
        setNotAllowedModal(false);
    }

    return (
        <Modal
            open={showNotAllowedModal}
            onClose={closeNotAllowedModal}
            basic
            size='small'
        >
            <Header icon='browser' content={title} />
            <Modal.Content>
                <h3>{text}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={closeNotAllowedModal} inverted>
                    <Icon name='checkmark' /> Got it
          </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default NotAllowedModal;