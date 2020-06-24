import React, { useState } from 'react';
import './filter.styles.scss';
import { Icon, Search, Checkbox, Form, Button } from 'semantic-ui-react'
import Slider from '@material-ui/core/Slider';
import { MARKS_MEBMERS, MARKS_DURATION } from '../../constants/constants';
import { projectFilterAddStart } from '../../redux/project/project.action';
import { connect } from 'react-redux';
import _ from 'lodash';
const Filter = ({ filterAddStart }) => {

    const [projectData, setProjectData] = useState({ projectName: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '', durationSlider: '', membersSlider: '' })

    const { projectName, size, category, language, progLanguage, durationSlider, membersSlider } = projectData;

    const handleSearchChange = (e, { value, name }) => {
        setProjectData({ ...projectData, [name]: value })
    }

    function valueLabelFormatMembers(value) {
        return MARKS_MEBMERS.findIndex((mark) => mark.value === value);
    }

    function valueLabelFormatDurations(value) {
        const labelArray = [0, 1, 3, 6, 12];
        return labelArray[MARKS_DURATION.findIndex((mark) => mark.value === value)];
    }

    const handleMemberChange = (e, value) => {
        const labelArray = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        setProjectData({ ...projectData, members: labelArray[MARKS_MEBMERS.findIndex((mark) => mark.value === value)].toString(), membersSlider: value });
    }

    const handleDurationChange = (e, value) => {
        const labelArray = ["", 1, 3, 6, 12];
        setProjectData({ ...projectData, duration: labelArray[MARKS_DURATION.findIndex((mark) => mark.value === value)].toString(), durationSlider: value});
    }

    const resetFilter = () => {
        setProjectData({ projectName: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '', durationSlider: 0, membersSlider: 0});
    }

    const buttonClicked = () => {
        const filteredProjectData = _.pickBy(projectData, _.identity); //remove all object if the value is "", null or undefined
        filterAddStart(filteredProjectData);
    }

    return (
        <div className='filter-box'>
            <div className='search-filter-container'>
                <ul className='tab-container'>
                    <li className='tab-project-search'>
                        <p>Project Search</p>
                    </li>
                    <li className='tab-member-search' onClick={resetFilter}>
                        <p>Reset Filter</p>
                    </li>
                </ul>
                <div className='tab-title'>
                    <div className='logo'>
                        <Icon name='pencil alternate' size='large' />
                    </div>
                    <div className='title'>
                        <p className='filter-big-title'>Project Filter</p>
                    </div>
                </div>
                <div className='search-options'>
                    <div className='search-input'>
                        <div className='tab-search-title'>
                            <p className='filter-title'>
                                <Icon name='unordered list' />
                                    Project Title
                            </p>
                            <Search className='search-type' size="large" name='projectName'
                                value={projectName}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className='search-input'>
                        <div className='tab-search'>
                            <div className='filter-title'>
                                <Icon name='box' />
                                    Project Size
                            </div>
                            <Form className='form'>
                                <Form.Field>
                                    <Checkbox
                                        checked={size === 'Small'}
                                        className='checkbox'
                                        label='Small'
                                        name='size'
                                        value='Small'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        checked={size === 'Medium'}
                                        className='checkbox'
                                        label='Medium'
                                        name='size'
                                        value='Medium'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        checked={size === 'Large'}
                                        className='checkbox'
                                        label='Large'
                                        name='size'
                                        value='Large'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                            </Form>
                        </div>
                    </div>

                    <div className='search-input'>
                        <div className='tab-search'>
                            <div className='filter-title'>
                                <Icon name='time' />
                        Project Duration
                        </div>
                        </div>
                        <Slider className='slider'
                            name='duration'
                            onChange={handleDurationChange}
                            valueLabelFormat={valueLabelFormatDurations}
                            aria-labelledby="discrete-slider-custom"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={MARKS_DURATION}
                            value={durationSlider}
                        />
                    </div>

                    <div className='search-input'>
                        <div className='tab-search category'>
                            <div className='filter-title'>
                                <Icon name='world' />
                        Project Category
                        </div>
                            <Form className='checkbox-options form'>
                                <Form.Field>
                                    <Checkbox
                                        checked={category === 'Web Application'}
                                        className='checkbox'
                                        label='Web Application'
                                        name='category'
                                        value='Web Application'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        checked={category === 'Mobile Application'}
                                        className='checkbox'
                                        label='Mobile Application'
                                        name='category'
                                        value='Mobile Application'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        checked={category === 'Others'}
                                        className='checkbox'
                                        label='Others'
                                        name='category'
                                        value='Others'
                                        onChange={handleSearchChange}
                                    />
                                </Form.Field>
                            </Form>
                        </div>
                    </div>

                    <div className='search-input'>
                        <div className='tab-search members'>
                            <div className='filter-title'>
                                <Icon name='users' />
                        Members for the project
                        </div>
                        </div>
                        <Slider className='slider'
                            name='member'
                            onChange={handleMemberChange}
                            valueLabelFormat={valueLabelFormatMembers}
                            aria-labelledby="discrete-slider-custom"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={MARKS_MEBMERS}
                            value={membersSlider}
                        />
                    </div>

                    <div className='search-input'>
                        <div className='tab-search-title'>
                            <p className='filter-title'>
                                <Icon name='comments' />
                        Conversation Language
                        </p>
                            <Search className='search-type' size="large" name='language'
                                value={language}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className='search-input'>
                        <div className='tab-search-title'>
                            <p className='filter-title'>
                                <Icon name='code' />
                        Programming Language
                        </p>
                            <Search className='search-type' size="large" name='progLanguage'
                                value={progLanguage}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className='search-button'>
                        <Button animated className='button'>
                            <Button.Content visible onClick={buttonClicked}>FILTER PROJECTS</Button.Content>
                            <Button.Content hidden onClick={buttonClicked}>
                                <Icon name='search' />
                            </Button.Content>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    filterAddStart: (filteredProjectData) => dispatch(projectFilterAddStart(filteredProjectData))
})

export default connect(null, mapDispatchToProps)(Filter);