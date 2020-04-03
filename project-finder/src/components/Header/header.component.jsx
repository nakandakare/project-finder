import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/project-finder-logo.png';
import Button from '@material-ui/core/Button';
import {ReactComponent as LogoutLogo} from '../../assets/logout.svg' 
import { useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { logoutStart} from '../../redux/user/user.actions';

const Header = ({ currentUser, logoutStart }) => {
    
    const { pathname } = useLocation();
    const path = pathname.replace('/', ''); 

    const startSignOut = () => {
        logoutStart();
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/projects' className='logo'>
                    <img className='logo-img' src={logo} alt='logo'></img>
                </Link>
            </div>
            <div className='options'>
                <Link className='option-each' to='/projects'>
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
                        <img className='user-img' src={currentUser.img}/>
                    </div>
                    <div className='user-name'>
                        <span >{currentUser.name}</span>
                    </div>
                    <div className='logout-button'>
                    <LogoutLogo onClick={startSignOut}/>
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
    currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    logoutStart: () => dispatch(logoutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);