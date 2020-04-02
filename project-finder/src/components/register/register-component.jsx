import React, {useState} from 'react';
import './register.styles.scss';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
 
const Register = () => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '', repassword: '',  name: ''});

    const { email, password, repassword , name } = userCredentials;

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();

    }

    return (
        <div className='register'>
            <div className='title'>
                Register
            </div>
            <form className='input-form' onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className='input'>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='name' id="outlined-basic" label="Your Name" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='email' id="outlined-basic" label="Email" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='password' id="outlined-basic" label="Password" type="password" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='repassword' id="outlined-basic" label="Password" type="password" variant="outlined" size="small" />
                    </div>
                </div>
                <div className='register-button'>
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                </div>
                <div className='no-account'>
                    <span>If you already have an account click the Sign In</span>
                </div>
            </form>
            <Link to='/signin'>
                <Button className="sign-in-button" size="medium" variant="contained" color="primary">
                    Sign In
                </Button>
            </Link>
        </div>
    )
}

export default Register;