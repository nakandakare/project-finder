import React, {useState} from 'react';
import './sign-in.styles.scss';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {emailSignInStart} from '../../redux/user/user.actions';

const SignIn = ({emailSignIn}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: '', keepSignIn: false});

    const { email, password, keepSignIn } = userCredentials;

    const handleChange = event => {
        const {value, name, checked} = event.target;
        setCredentials({...userCredentials, [name]: value || checked});
    }

    const handleSubmit = event => {
        event.preventDefault();
        emailSignIn(email, password, keepSignIn);
    }

    return (
        <div className='sign-in'>
            <div className='title'>
                Sign In
            </div>
            <form className='input-form' onSubmit={handleSubmit} noValidate autoComplete="off">
            <div className='input'>
                <div className='input-email'>
                        <TextField className='input-section' onChange={handleChange} required name='email' autoComplete="username" label="Email" variant="outlined" size="small" />
                </div>
                <div className='input-password'>
                        <TextField className='input-section' onChange={handleChange} required name='password' autoComplete="new-password" label="Password" type="password" variant="outlined" size="small" />
                </div>  
            </div>
            <div className='keep-check'>
                <FormControlLabel className='checkbox-label'
                    control={
                        <Checkbox
                            checked={userCredentials.keepSignIn}
                            onChange={handleChange}
                            name="keepSignIn"
                            color="primary"
                            className='login-checkbox'
                            size='small'
                        />
                    }
                    label="Keep me signed in"
                />   
            </div>
            <div className='sign-in-button'>
                    <Button variant="contained" color="primary" type="submit">
                        SIGN IN
                    </Button>
            </div>
            <div className='forgot-password'>
                <span className='forgot-span'>Forgot your password?</span>
            </div>
            <div className='no-account'>
                    <span>If you don’t already have an account click the Register<br/> button below to create an account</span>
            </div>
            </form>
            <Link to='/register'>
                <Button className="register-button" size="medium" variant="contained" color="primary">
                    REGISTER
                </Button>
            </Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    emailSignIn: (email, password, keepSignIn) => dispatch(emailSignInStart({ email, password, keepSignIn}))
})
export default connect(null,mapDispatchToProps)(SignIn);