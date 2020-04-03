import React, { useState } from 'react';
import './project-create.styles.scss';
import TextField from '@material-ui/core/TextField';
import { OPTIONS } from '../../constants/constants';
import { Select } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';

const ProjectCreate = () => {

    const [projectData, setProjectData] = useState({ userId: '', name: '', description: '', size: '', duration: '', difficulty: '', members: '', language: '', progLanguage: '' })

    const handleChange = (event) => {
        const { value, name } = event.target;
        setProjectData({ ...projectData, [name]: value });
        //insert user.id
    }

    const optionChange = (e, data) => {
        const { name, value } = data;
        setProjectData({ ...projectData, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log("HOLA");
    }

    return (
        <div className='project-create'>
            <span className='project-info'>Project Info</span>
            <form className='project-create-form' onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField className='project-name project-input' onChange={handleChange} required name='name' label="Project name" variant="outlined" size="small" />
                <TextField className='project-description project-input' id="outlined-multiline-static" onChange={handleChange} label="Project description" multiline required rows="5" variant="outlined" name='description'
                />
                <div className='project-row'>
                    <TextField className='project-duration project-input' onChange={handleChange} required name='duration' label="Project duration (Date)" variant="outlined" size="small" />
                    <Select className='project-size project-input' placeholder='Project size' name='size' onChange={optionChange} options={OPTIONS.SIZE} />
                </div>
                <div className='project-row'>
                    <Select className='project-difficulty project-input' placeholder='Project difficulty' name='difficulty' onChange={optionChange} options={OPTIONS.DIFFICULTY} />
                    <Select className='project-members project-input' placeholder='Members for the project' name='members' onChange={optionChange} options={OPTIONS.MEMBERS} />
                </div>
                <div className='project-row'>
                    <TextField className='project-language project-input' onChange={handleChange} required name='language' label="Conversation language" variant="outlined" size="small" />
                    <TextField className='project-programming-language project-input' onChange={handleChange} required name='progLanguage' label="Programming language" variant="outlined" size="small" />
                </div>
                <Button className="create-button" type="submit" size="medium" variant="contained" color="primary">
                    Create project
                </Button>
            </form>
        </div>
    )
}

export default ProjectCreate;