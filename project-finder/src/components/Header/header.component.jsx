import React from 'react';
import './header.styles.scss';
import { Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom'

const Header = () => {

    const {pathname} = useLocation();
    const path = pathname.replace('/','');
    console.log(path);

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/projects' className='logo'>
                    <img className='logo-img' src={logo}></img>
                </Link>
            </div>
            <div className='options'>
                <Link className='option-projects' to='/projects'>
                    PROJECTS
                    {
                        path === 'projects' ? <hr className='hr-highlight'/> : <hr/>
                    }
                </Link>
                <Link className='option-members' to='/members'>
                    MEMBERS
                    {
                     path === 'members' ? <hr className='hr-highlight'/> : <hr />
                    }
                </Link>
                <Link className='option-chat' to='/chat'>
                    CHAT
                                        {
                        path === 'chat' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
                <Link className='option-support' to='/support'>
                    SUPPORT
                                                            {
                        path === 'support' ? <hr className='hr-highlight' /> : <hr />
                    }
                </Link>
            </div>
            <div className='auth-options'>
                <Link to='/login'>
                    <Button className="login-button" color="primary">
                        LOG IN
                    </Button>
                </Link>
                <Link to='/register'>
                    <Button className="register-button" size="small" variant="contained" color="primary">
                        REGISTER
                    </Button>
                </Link>
            </div>
        </header>
    )
}

export default Header;