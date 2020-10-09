import React from 'react';
import './filter.styles.scss';
import { Icon, Search, Checkbox, Form, Button } from 'semantic-ui-react'
import Slider from '@material-ui/core/Slider';
import { MARKS_MEBMERS, MARKS_DURATION } from '../../constants/constants';
import { projectFilterStart } from '../../redux/project/project.action';
import { connect } from 'react-redux';
import _ from 'lodash';
const Filter = ({ projectFilterStart, projectFilterData, setProjectFilterData }) => {

    const { projectName, size, category, language, progLanguage, durationSlider, membersSlider } = projectFilterData;

    const handleSearchChange = (e, { value, name }) => {
        setProjectFilterData({ ...projectFilterData, [name]: value })
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
        setProjectFilterData({ ...projectFilterData, members: labelArray[MARKS_MEBMERS.findIndex((mark) => mark.value === value)].toString(), membersSlider: value });
    }

    const handleDurationChange = (e, value) => {
        const labelArray = ["", 1, 3, 6, 12];
        setProjectFilterData({ ...projectFilterData, duration: labelArray[MARKS_DURATION.findIndex((mark) => mark.value === value)].toString(), durationSlider: value });
    }

    const resetFilter = () => {
        setProjectFilterData({ projectName: '', size: '', duration: '', category: '', members: '', language: '', progLanguage: '', durationSlider: 0, membersSlider: 0 });
        projectFilterStart({ offset: 0 });
    }

    const buttonClicked = () => {
        const filteredProjectData = _.pickBy(projectFilterData, _.identity); //remove all object if the value is "", null or undefined
        projectFilterStart({ ...filteredProjectData, offset: 0 });
    }

    return (
        <div className='filterBox'>
            <div className='searchFilterContainer'>
                <ul className='tabContainer'>
                    <li className='tabProjectSearch'>
                        <p>Project Search</p>
                    </li>
                    <li className='tabMemberSearch' onClick={resetFilter}>
                        <p>Reset Filter</p>
                    </li>
                </ul>
                <div className='tabTitle'>
                    <div className='logo'>
                        <Icon name='pencil alternate' size='large' />
                    </div>
                    <div className='title'>
                        <p className='filterBigTitle'>Project Filter</p>
                    </div>
                </div>
                <div className='searchOptions'>
                    <div className='searchInput projectTitleSearch'>
                        <div className='filterTitle'>
                            <Icon name='unordered list' />
                            <p>Project Title</p>
                        </div>
                        <Search className='searchType' size="large" name='projectName'
                            value={projectName}
                            onSearchChange={handleSearchChange}
                            showNoResults={false}
                        />
                    </div>
                    <div className='searchInput'>
                        <div className='filterTitle'>
                            <Icon name='box' />
                            <p>Project Size</p>
                        </div>
                        <Form className='form'>
                            <Form.Field>
                                <Checkbox
                                    checked={size === ''}
                                    className='checkbox all'
                                    label='All'
                                    name='size'
                                    value={''}
                                    onChange={handleSearchChange}
                                />
                            </Form.Field>
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
                    <div className='searchInput'>
                        <div className='filterTitle'>
                            <Icon name='time' />
                            <p>Project Duration (Month)</p>
                        </div>
                        <div className='sliderContainer'>
                            <Slider className='slider'
                                name='duration'
                                onChange={handleDurationChange}
                                valueLabelFormat={valueLabelFormatDurations}
                                aria-labelledby="discrete-slider-custom"
                                step={null}
                                valueLabelDisplay="auto"
                                marks={MARKS_DURATION}
                                value={parseInt(durationSlider)}
                            />
                        </div>
                    </div>
                    <div className='searchInput category'>
                        <div className='filterTitle'>
                            <Icon name='world' />
                            <p>Project Category</p>
                        </div>
                        <Form className='checkboxOptions form'>
                            <Form.Field>
                                <Checkbox
                                    checked={category === ''}
                                    className='checkbox all'
                                    label='All'
                                    name='category'
                                    value={''}
                                    onChange={handleSearchChange}
                                />
                            </Form.Field>
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
                    <div className='searchInput members'>
                        <div className='filterTitle'>
                            <Icon name='users' />
                            <p>Members for the project</p>
                        </div>
                        <div className='sliderContainer'>
                            <Slider className='slider'
                                name='member'
                                onChange={handleMemberChange}
                                valueLabelFormat={valueLabelFormatMembers}
                                aria-labelledby="discrete-slider-custom"
                                step={null}
                                valueLabelDisplay="auto"
                                marks={MARKS_MEBMERS}
                                value={parseInt(membersSlider)}
                            />
                        </div>
                    </div>
                    <div className='searchInput'>
                        <p className='filterTitle'>
                            <Icon name='comments' />
                            <p>Conversation Language</p>
                        </p>
                        <Search className='searchType' size="large" name='language'
                            value={language}
                            onSearchChange={handleSearchChange}
                            showNoResults={false}
                        />
                    </div>
                    <div className='searchInput'>
                        <p className='filterTitle'>
                            <Icon name='code' />
                            <p>Programming Language</p>
                        </p>
                        <Search className='searchType' size="large" name='progLanguage'
                            value={progLanguage}
                            onSearchChange={handleSearchChange}
                            showNoResults={false}
                        />
                    </div>
                </div>
                <div className='searchButton'>
                    <Button animated className='button' onClick={buttonClicked}>
                        <Button.Content visible>FILTER PROJECTS</Button.Content>
                        <Button.Content hidden>
                            <Icon name='search' />
                        </Button.Content>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    projectFilterStart: (filteredProjectData) => dispatch(projectFilterStart(filteredProjectData))
})

export default connect(null, mapDispatchToProps)(Filter);