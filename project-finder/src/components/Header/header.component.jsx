import React, { useState } from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Dropdown, Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { selectCurrentUser, selectNotificationCount} from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutStart, emptyNotificationCount, showHideNotification } from '../../redux/user/user.actions';
import { projectFilterAddStart } from '../../redux/project/project.action';
import ProjectCreate from '../../components/project-create/project-create.component';
import Badge from '@material-ui/core/Badge';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const Header = ({ currentUser, logoutStart, filterAddStart, notificationCount, emptyNotificationCount, showHideNotification }) => {
    
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

    const notificationClickHandler = () => {
        showHideNotification();
        emptyNotificationCount();
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
                        <div className='pencilIcon menuIcon' onClick={showProjectCreateHandler}>
                            <Icon size='large' name='pencil' title='Create Project'/>
                        </div>
                            <Badge className='bellIcon menuIcon' color="secondary" badgeContent={notificationCount} onClick={notificationClickHandler} title='Notification'>
                                <NotificationsActiveIcon />
                            </Badge>
                        <div className='logoutIcon menuIcon' title='Logout' onClick={startSignOut}>
                            <Icon size='large' name='log out' />
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
    currentUser: selectCurrentUser(state),
    notificationCount: selectNotificationCount(state)
})

const mapDispatchToProps = (dispatch) => ({
    logoutStart: () => dispatch(logoutStart()),
    filterAddStart: (filteredProjectData) => dispatch(projectFilterAddStart(filteredProjectData)),
    emptyNotificationCount: () => dispatch(emptyNotificationCount()),
    showHideNotification: () => dispatch(showHideNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);