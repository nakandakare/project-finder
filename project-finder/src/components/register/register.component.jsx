import React, {useState} from 'react';
import './register.styles.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {registerStart} from '../../redux/user/user.actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
const Register = ({registerStart}) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '', repassword: '',  name: '', flag: '', flagSelected: ''});
    const options = countryList().getData()
    const { email, password, repassword, name, flag, flagSelected} = userCredentials;

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }
    
    const flagHandler = event => {
        setCredentials({...userCredentials, flagSelected: event, flag: event.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(password !== repassword){
            return alert('The passwords you typed do not match');
        }
        registerStart(email, password, name, flag);
    }

    return (
        <div className='register'>
            <div className='title'>
                Register
            </div>
            <form className='input-form' onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className='input'>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='name' label="Your Name" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='email' autoComplete="username" label="Email" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='password' label="Password" type="password" autoComplete="new-password" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                        <TextField className='input-section' onChange={handleChange} required name='repassword' label="Password" type="password" autoComplete="new-password" variant="outlined" size="small" />
                    </div>
                    <div className='input'>
                    <Select
                        options={options}
                        value={flagSelected}
                        onChange={flagHandler}
                        placeholder='Nationality'
                    />
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

const mapDispatchToProps = dispatch => ({
    registerStart: (email, password, name, flag) => dispatch(registerStart({email, password, name, flag}))
})

export default connect(null, mapDispatchToProps)(Register);