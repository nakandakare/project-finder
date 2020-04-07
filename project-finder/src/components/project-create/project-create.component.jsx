import React, { useState } from 'react';
import './project-create.styles.scss';
import TextField from '@material-ui/core/TextField';
import { OPTIONS } from '../../constants/constants';
import { Select, Modal } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import { selectCreateShow  } from '../../redux/project/project.selectors';
import { projectCreateClose } from '../../redux/project/project.action';    
import { projectAddStart} from '../../redux/project/project.action';
import { selectCurrentUser} from '../../redux/user/user.selectors';
import { connect } from 'react-redux';

const ProjectCreate = ({currentUser, projectAddStart, createShow, projectCreateClose }) => {

    const [projectData, setProjectData] = useState({ userId: '', name: '', description: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '' })

    const handleChange = (event) => {
        const { value, name } = event.target;
        setProjectData({ ...projectData, [name]: value, userId: currentUser.id });
        console.log(projectData);
    }

    const optionChange = (e, data) => {
        const { name, value } = data;
        setProjectData({ ...projectData, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        projectAddStart(projectData)
    }

    return (
        <Modal className='modal' open={createShow} closeIcon onClose={projectCreateClose}  >
            <Modal.Content image>
                <Modal.Description>
                    <div className='project-create'>
                        <span className='project-info'>Project Info</span>
                        <span icon="cancel"></span>
                        <form className='project-create-form' onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField className='project-name project-input' onChange={handleChange} required name='name' label="Project name" variant="outlined" size="small" />
                            <TextField className='project-description project-input' id="outlined-multiline-static" onChange={handleChange} label="Project description" multiline required rows="5" variant="outlined" name='description'
                            />
                            <div className='project-row'>
                                <Select className='project-duration project-input' placeholder='Project duration' name='duration' onChange={optionChange} options={OPTIONS.DURATION} />
                                <Select className='project-size project-input' placeholder='Project size' name='size' onChange={optionChange} options={OPTIONS.SIZE} />
                            </div>
                            <div className='project-row'>
                                <Select className='project-category project-input' placeholder='Project category' name='category' onChange={optionChange} options={OPTIONS.CATEGORY} />
                                <TextField className='project-members project-input' onChange={handleChange} required name='members' label="Members for the project (Max 10)" variant="outlined" size="small" />
                            </div>
                            <div className='project-row'>
                                <TextField className='project-language project-input' onChange={handleChange} required name='language' label="Conversation language" variant="outlined" size="small" />
                                <TextField className='project-programming-language project-input' onChange={handleChange} required name='progLanguage' label="Programming language" variant="outlined" size="small" />
                            </div>
                            <Button className="create-button" type="submit" size="medium" variant="contained" color="primary" >
                                Create project
                             </Button>
                        </form>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    createShow: selectCreateShow
})

const mapDispatchToProps = dispatch => ({
    projectAddStart: (projectData) => dispatch(projectAddStart(projectData)),
    projectCreateClose: () => dispatch(projectCreateClose())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectCreate);