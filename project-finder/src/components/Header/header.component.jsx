import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { projectCreateShow } from '../../redux/project/project.action'
import { Dropdown } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutStart} from '../../redux/user/user.actions';
import { projectFilterAddStart } from '../../redux/project/project.action';

const Header = ({ currentUser, logoutStart, projectCreateShow, filterAddStart }) => {

    const { pathname } = useLocation();
    const path = pathname.replace('/', ''); 

    const startSignOut = () => {
        logoutStart();
    }

    const filterReset = () => {
        filterAddStart({});
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/projects' className='logo'>
                </Link>
            </div>
            <div className='options'>
                <Link className='option-each' to='/projects' onClick={filterReset}>
                    PROJECTS
                    {
                        path === 'projects' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
                <Link className='option-each' to='/members'>
                    MEMBERS
                    {
                        path === 'members' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
                <Link className='option-each' to='/chat'>
                    CHAT
                                        {
                        path === 'chat' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
                <Link className='option-each' to='/support'>
                    SUPPORT
                                                            {
                        path === 'support' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
            </div>
            {currentUser ?
                <div className='user-header'>
                    <div className='image-border'>
                        <img className='user-img' src={currentUser.img} alt='user-img'/>
                    </div>
                    <div className='user-name'>
                        <span >{currentUser.name}</span>
                    </div>
                    <div className='logout-button'>
                        <Dropdown direction='left' closeOnChange>
                            <Dropdown.Menu >
                                <Dropdown.Item icon='pencil alternate' text='Create Project' onClick={projectCreateShow}/>
                                <Dropdown.Item icon='bell' text='Notification' />
                                <Dropdown.Divider />
                                <Dropdown.Item icon='sign-out' text='Log Out' onClick={startSignOut} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                :
                <div className='auth-options'>
                    <Link to='/signin'>
                        <Button className="login-button" color="primary">
                            SIGN IN
                        </Button>
                    </Link>
                    <Link to='/register'>
                        <Button className="register-button" size="medium" variant="contained" color="primary">
                            REGISTER
                        </Button>
                    </Link>
                </div> 
            }
        </header>
    )
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    logoutStart: () => dispatch(logoutStart()),
    projectCreateShow: () => dispatch(projectCreateShow()),
    filterAddStart: (filteredProjectData) => dispatch(projectFilterAddStart(filteredProjectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);