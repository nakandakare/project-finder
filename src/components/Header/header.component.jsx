import React, { useState } from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Icon } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { selectCurrentUser, selectNotificationCount} from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutStart, emptyNotificationCount, showHideNotification } from '../../redux/user/user.actions';
import { projectFetchStart } from '../../redux/project/project.action';
import ProjectCreate from '../project-create/project-create.component';
import Badge from '@material-ui/core/Badge';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import projectLogo from '../../assets/project-finder-logo.png';

const Header = ({ currentUser, logoutStart, filterAddStart, notificationCount, emptyNotificationCount, showHideNotification, projectFetchStart }) => {
    
    const { pathname } = useLocation();
    const path = pathname.replace('/', '');

    const [showProjectCreate, setShowProjectCreate] = useState(false);

    const startSignOut = () => {
        logoutStart();
    }

    const showProjectCreateHandler = () => {
        setShowProjectCreate(true);
    }

    const notificationClickHandler = () => {
        showHideNotification();
        emptyNotificationCount();
    }

    const logoClickHandler = () => {
        projectFetchStart( {offset: 0} );
    }

    return (
    <div className='headerContainer'>
        <header className='headerInner'>
            <div className='logoContainer'>
                <Link to='/projects' onClick={logoClickHandler}>
                    <img className='logo' src={projectLogo} alt='project logo'/>
                </Link>
            </div>
            <div className='options'>
                <Link className='optionEach' to='/projects'>
                    PROJECTS
                    <hr className={path === 'projects' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='optionEach' to={`/chat`}>
                    CHAT
                    <hr className={path === 'chat' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='optionEach' to='/contact'>
                    CONTACT
                    <hr className={path === 'support' ? 'hr-highlight' : <hr />} />
                </Link>
            </div>
            {currentUser ?
                <div className='userHeader'>
                    <div className='imageBorder'>
                        <img className='userImg' src={currentUser.img} alt='userImg' />
                    </div>
                    <div className='userName'>
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
                <div className='authOptions'>
                    <Link to='/signin'>
                        <Button className="loginButton" color="primary">
                            SIGN IN
                        </Button>
                    </Link>
                    <Link to='/register'>
                        <Button className="registerButton" size="medium" variant="contained" color="primary">
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
    emptyNotificationCount: () => dispatch(emptyNotificationCount()),
    showHideNotification: () => dispatch(showHideNotification()),
    projectFetchStart: (v) => dispatch(projectFetchStart(v))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);