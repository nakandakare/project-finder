import React from 'react';
import './project-request.styles.scss';
import { Button, Card, Image } from 'semantic-ui-react'
import { saveUserToProject, declileRequest } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { notifySocket } from '../../constants/constants';

const ProjectRequest = ({ name, img, project_name, note, requestUserId, projectId, saveUserToProject, declileRequest, setFilterValue, index}) => {

    const approveHandler = () => {
        saveUserToProject({ requestUserId, projectId })
        sendRequestOption({ requestUserId, projectId, option: true })
        setFilterValue(index)
    }

    const declineHandler = () => {
        declileRequest({ requestUserId, projectId })
        sendRequestOption({ requestUserId, projectId, option: false})
        setFilterValue(index)
    }

    //Option => Accept = true, Decline = false
    const sendRequestOption = (value) => {
        notifySocket.emit('sendRequestOption', value);
    }   

    return (
        <Card className='eachCard'>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={img}
                />
                <Card.Header>{name}</Card.Header>
                <Card.Meta className='requestSubtitle'>Project Name: <strong>{project_name}</strong></Card.Meta>
                <Card.Description>
                    {
                        note ? <p>{note}</p> : null
                    }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' onClick={approveHandler}>
                        Approve
                    </Button>
                    <Button basic color='red' onClick={declineHandler}>
                        Decline
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

const mapDispatchToProps = dispatch => ({
    saveUserToProject: (value) => dispatch(saveUserToProject(value)),
    declileRequest: (value) => dispatch(declileRequest(value))
})

 export default connect(null, mapDispatchToProps)(ProjectRequest);