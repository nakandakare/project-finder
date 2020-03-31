import React from 'react';
import './project-item.styles.scss';
import { ReactComponent as Logo } from '../../assets/project-logo.svg'
import FlagIcon from '../flag-icon-factory/flag-icon-factory';
import ReadMoreAndLess from 'react-read-more-less';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const ProjectItem = () => {

    return (
        <div className='project-item'>
            <div className='sidebar'>
                <span className='date'>Published MAR 30</span>
                <Logo className='project-logo' />
            </div>
            <div>
                <div className='project-detail'>
                    <div className='project-name-button-row'>
                        <div className='project-name'>
                            <span className='span-add-margin'>Project name: </span>
                            <span className='project-title'>Facebook</span>
                        </div>
                        <div className='apply-button'>
                            <Button
                                variant="contained"
                                color="primary"
                                className={'icon-button'}
                                endIcon={<Icon>thumb_up</Icon>}
                            >
                                APPLY
                             </Button>
                        </div>
                    </div>
                    <div className='project-description'>
                        <span className='span-add-margin'>Description: </span>
                        <ReadMoreAndLess charLimit={200}
                            readMoreText="more"
                            readLessText="less">Lorem Ipsum is simply dummy text
                            of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to
                            make a type specimen book. It has survived not only
                            five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s
                            with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum
                        </ReadMoreAndLess>
                        <div className='hr-div first-hr-div' />
                        <div className='column-box'>
                            <div className='first-column'>
                                <div className='first-row'>
                                    <span className='span-add-margin'>Project Size</span>
                                    <spa>1-5</spa>
                                </div>
                                <div className='second-row'>
                                    <span className='span-add-margin'>Looking For</span>
                                    <spa>14-20</spa>
                                </div>
                            </div>
                            <div className='second-column'>
                                <div className='first-row'>
                                    <span className='span-add-margin'>Project Duration</span>
                                    <spa>United States</spa>
                                </div>
                                <div className='second-row'>
                                    <span className='span-add-margin'>Language</span>
                                    <spa>EN</spa>
                                </div>
                            </div>
                            <div className='third-column'>
                                <div className='first-row'>
                                    <span className='span-add-margin'>Project Difficulty</span>
                                    <spa>US Northeast, US Southeast</spa>
                                </div>
                                <div className='second-row'>
                                    <span className='span-add-margin'>Prog. Language</span>
                                    <spa>Mon, Tue, Wed, Thu, Fri, Sat, Sun (Evening)</spa>
                                </div>
                            </div>
                        </div>
                        <div className='hr-div' />
                        <div className='user-section'>
                            <div className='user-picture'>
                                <img className='picture' src={'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/face-wash-2-1561136582.jpg'} alt='John Doe'></img>
                            </div>
                            <div className='user-name'>
                                <FlagIcon code="us" />
                                <span className='name'>Rebecca Smith</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;