import React, { useState } from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Dropdown, Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutStart } from '../../redux/user/user.actions';
import { projectFilterAddStart } from '../../redux/project/project.action';
import ProjectCreate from '../../components/project-create/project-create.component';

const Header = ({ currentUser, logoutStart, filterAddStart }) => {

    const { pathname } = useLocation();
    const path = pathname.replace('/', '');

    const [showProjectCreate, setShowProjectCreate] = useState(false);

    const startSignOut = () => {
        logoutStart();
    }

    const filterReset = () => {
        filterAddStart({});
    }

    const showProjectCreateHandler = () => {
        setShowProjectCreate(true);
    }

    return (
    <div className='headerContainer'>
        <header className='header'>
            <div className='logo'>
                <Link to='/projects' className='logo'>
                </Link>
            </div>
            <div className='options'>
                <Link className='option-each' to='/projects' onClick={filterReset}>
                    PROJECTS
                    <hr className={path === 'projects' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='option-each' to='/members'>
                    MEMBERS
                    <hr className={path === 'members' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='option-each' to={`/chat`}>
                    CHAT
                    <hr className={path === 'chat' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='option-each' to='/support'>
                    SUPPORT
                    <hr className={path === 'support' ? 'hr-highlight' : <hr />} />
                </Link>
            </div>
            {currentUser ?
                <div className='user-header'>
                    <div className='image-border'>
                        <img className='user-img' src={currentUser.img} alt='user-img' />
                    </div>
                    <div className='user-name'>
                        <span >{currentUser.name.split(' ').slice(0, -1).join(' ')}</span>
                    </div>
                    <div className='menuIcons'>
                        <div className='pencilIcon'>
                            <Icon size='large' name='pencil' onClick={showProjectCreateHandler} />
                        </div>
                        <div className='bellIcon'>
                            <Icon size='large' name='bell' />
                        </div>
                        <div className='logoutIcon'>
                            <Icon size='large' name='log out' onClick={startSignOut} />
                        </div>
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
            <ProjectCreate showProjectCreate={showProjectCreate} setShowProjectCreate={setShowProjectCreate} />
        </header>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    logoutStart: () => dispatch(logoutStart()),
    filterAddStart: (filteredProjectData) => dispatch(projectFilterAddStart(filteredProjectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);