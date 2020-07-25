import React, { useState } from './node_modules/react';
import './header.styles.scss';
import { Link } from './node_modules/react-router-dom';
import Button from './node_modules/@material-ui/core/Button';
import { Icon } from './node_modules/semantic-ui-react'
import { useLocation } from './node_modules/react-router-dom'
import { selectCurrentUser, selectNotificationCount} from '../../redux/user/user.selectors';
import { connect } from './node_modules/react-redux';
import { logoutStart, emptyNotificationCount, showHideNotification } from '../../redux/user/user.actions';
import { projectFetchStart } from '../../redux/project/project.action';
import ProjectCreate from '../project-create/project-create.component';
import Badge from './node_modules/@material-ui/core/Badge';
import NotificationsActiveIcon from './node_modules/@material-ui/icons/NotificationsActive';
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
        <header className='header-p'>
            <div className='logoContainer'>
                <Link to='/projects' onClick={logoClickHandler}>
                    <img className='logo' src={projectLogo} alt='project logo'/>
                </Link>
            </div>
            <div className='options'>
                <Link className='option-each' to='/projects'>
                    PROJECTS
                    <hr className={path === 'projects' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='option-each' to={`/chat`}>
                    CHAT
                    <hr className={path === 'chat' ? 'hr-highlight' : <hr />} />
                </Link>
                <Link className='option-each' to='/contact'>
                    CONTACT
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
    emptyNotificationCount: () => dispatch(emptyNotificationCount()),
    showHideNotification: () => dispatch(showHideNotification()),
    projectFetchStart: (v) => dispatch(projectFetchStart(v))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);