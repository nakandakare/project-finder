import React, { useState } from 'react';
import './project-create.styles.scss';
import TextField from '@material-ui/core/TextField';
import { OPTIONS } from '../../constants/constants';
import { Select, Modal } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import { projectAddStart } from '../../redux/project/project.action';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';

const ProjectCreate = ({ currentUser, projectAddStart, showProjectCreate, setShowProjectCreate }) => {

    const [projectData, setProjectData] = useState({ userId: '', name: '', description: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '' });
    const [projectDataError, setProjectDataError] = useState({ name: false, description: false, size: false, duration: false, category: false, members: false, language: false, progLanguage: false})
    
    const handleChange = (event) => {
        const { value, name } = event.target;
        setProjectData({ ...projectData, [name]: value, userId: currentUser.id });
        setProjectDataError({ ...projectDataError, [name]: false })
    }

    const optionChange = (e, data) => {
        const { name, value } = data;
        setProjectData({ ...projectData, [name]: value });
        setProjectDataError({ ...projectDataError, [name]: false })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (validInformation()){
        projectAddStart(projectData)
        closeProjectCreateHandler();
        } 
    }

    const validInformation = () => {
        const { name, description, size, duration, category, members, language, progLanguage } = projectData;
        let formValid = true;
        let nameError, descriptionError, sizeError, durationError, categoryError, membersError, languageError, progLanguageError = false;

        if (name === '') {
            formValid = false;
            nameError = true;
        }

        if (description === '') {
            formValid = false;
            descriptionError = true;
        }

        if (size === '') {
            formValid = false;
            sizeError = true;
        }

        if (duration === '') {
            formValid = false;
            durationError = true;
        }

        if (category === '') {
            formValid = false;
            categoryError = true;
        }

        if (members === '') {
            formValid = false;
            membersError = true;
        }

        if (language === '') {
            formValid = false;
            languageError = true;
        }

        if (progLanguage === '') {
            formValid = false;
            progLanguageError = true;
        }

        setProjectDataError({...projectDataError, name: nameError, description: descriptionError, size: sizeError, duration: durationError, category: categoryError, members: membersError, language: languageError, progLanguage: progLanguageError})
        return formValid;
    }

    const closeProjectCreateHandler = () => {
        setShowProjectCreate(false);
    }

    return (
        <Modal className='modal' open={showProjectCreate} closeIcon onClose={closeProjectCreateHandler}  >
            <Modal.Content image className='description-pc'>
                <Modal.Description>
                    <div className='project-create'>
                        <span className='project-info'>Create Project</span>
                        <span icon="cancel"></span>
                        <form className='project-create-form' onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField error={projectDataError.name} className='project-name project-input' onChange={handleChange} required name='name' label="Project name" variant="outlined" size="small" />
                            <TextField error={projectDataError.description} className='project-description project-input' id="outlined-multiline-static" onChange={handleChange} label="Project description" multiline required rows="5" variant="outlined" name='description'
                            />
                            <div className='project-row'>
                                <Select error={projectDataError.duration} className='project-duration project-input' placeholder='Project duration' name='duration' onChange={optionChange} options={OPTIONS.DURATION} />
                                <Select error={projectDataError.size} className='project-size project-input' placeholder='Project size' name='size' onChange={optionChange} options={OPTIONS.SIZE} />
                            </div>
                            <div className='project-row'>
                                <Select error={projectDataError.category} className='project-category project-input' placeholder='Project category' name='category' onChange={optionChange} options={OPTIONS.CATEGORY} />
                                <Select error={projectDataError.members} className='project-members project-input' placeholder='Members for the project (Max 10)' required name='members' onChange={optionChange} options={OPTIONS.MEMBERS} />
                            </div>
                            <div className='project-row'>
                                <TextField error={projectDataError.language} className='project-language project-input' onChange={handleChange} required name='language' label="Conversation language" variant="outlined" size="small" />
                                <TextField error={projectDataError.progLanguage} className='project-programming-language project-input' onChange={handleChange} required name='progLanguage' label="Programming language" variant="outlined" size="small" />
                            </div>
                            <Button className="create-button" type="submit" size="medium" variant="contained" color="primary">
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
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    projectAddStart: (projectData) => dispatch(projectAddStart(projectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);