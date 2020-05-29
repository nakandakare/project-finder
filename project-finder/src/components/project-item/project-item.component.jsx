import React from 'react';
import './project-item.styles.scss';
import FlagIcon from '../../utils/flag-icon-factory';
import ReadMoreAndLess from 'react-read-more-less';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import UserPicture from '../user-picture/user-picture.component';

const ProjectItem = ({ projectname, description, size, duration, members, language, proglanguage, created_at, name, img, flag, category }) => {

    const created = created_at.substring(0, created_at.indexOf('T'));
    return (
        <div className='project'>
            <div className='project-item'>
                <div className='project-sidebar'>
                    <div className='user-section'>
                        <UserPicture img={img} />
                        <div className='user-name'>
                            <span className='name'>{name.toUpperCase()}</span>
                            <FlagIcon className='flag' code={flag.toLowerCase()} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='project-detail'>
                        <div className='project-name-button-row'>
                            <div className='project-name'>
                                <span className='project-label'>Project name: </span>
                                <span className='project-title'>{projectname}</span>
                            </div>
                            <div className='project-created-button-end'>
                                <div className='created-at'>
                                    {created}
                                </div>
                                <div className='apply-button'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='icon-button'
                                        size='small'
                                        endIcon={<Icon>group</Icon>}
                                    >
                                        APPLY
                                </Button>
                                </div>
                            </div>
                        </div>
                        <div className='project-description'>
                            <span className='span-add-margin'>Description: </span>
                            <div className='readmore-div'>
                                <ReadMoreAndLess charLimit={140}
                                    readMoreText="more"
                                    readLessText="less">{description}
                                </ReadMoreAndLess>
                            </div>
                            <div className='hr-div first-hr-div' />
                            <div className='column-box'>
                                <div className='first-column'>
                                    <div className='first-row'>
                                        <span className='span-add-margin'>Project Category</span>
                                        <span>{category}</span>
                                    </div>
                                    <div className='second-row'>
                                        <span className='span-add-margin'>Looking For</span>
                                        <span>{members} Member(s)</span>
                                    </div>
                                </div>
                                <div className='second-column'>
                                    <div className='first-row'>
                                        <span className='span-add-margin'>Project Duration</span>
                                        <span>{duration} Month</span>
                                    </div>
                                    <div className='second-row'>
                                        <span className='span-add-margin'>Language</span>
                                        <span>{language}</span>
                                    </div>
                                </div>
                                <div className='third-column'>
                                    <div className='first-row'>
                                        <span className='span-add-margin'>Project Size</span>
                                        <span>{size}</span>
                                    </div>
                                    <div className='second-row'>
                                        <span className='span-add-margin'>Prog. Language</span>
                                        <span>{proglanguage}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectItem;