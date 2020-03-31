import React from 'react';
import './sign-in.styles.scss';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='sign-in'>
            <div className='title'>
                Sign In
            </div>
            <form className='input-form' noValidate autoComplete="off">
            <div className='input'>
                <div className='input-email'>
                <TextField className='input-section' id="outlined-basic" label="Email" variant="outlined" size="small" />
                </div>
                <div className='input-password'>
                <TextField className='input-section' id="outlined-basic" label="Password" type="password" variant="outlined" size="small" />
                </div>  
            </div>
            <div className='keep-check'>
                <FormControlLabel
                    control={
                        <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange}
                            name="checkedB"
                            color="primary"
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
                <span>Forgot your password?</span>
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

export default SignIn;