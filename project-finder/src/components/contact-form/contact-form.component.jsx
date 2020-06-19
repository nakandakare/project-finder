import React, {useState, useEffect} from 'react';
import './contact-from.styles.scss';
import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const ContactFrom = ({ currentUser }) => {

    const [contactData, setContactData] = useState({ typeSubject: '', email: '', name: '', message: ''})
    const [formError, setFormError] = useState({ contactType: false, email: false, name: false, message: false})
    const options = [ { key: 'c', text: 'Contact', value: 'Contact' }, { key: 'f', text: 'Feedback', value: 'Feedback' }, { key: 'b', text: 'Reporting Bugs', value: 'Reporting Bugs' }]

    useEffect(() => {
        if (currentUser) {
            setContactData({...contactData, name: currentUser.name });
        }
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactData({...contactData, [name]: value})
    }

    const typeChange = (e, {value, name}) => {
        setContactData({...contactData, [name]: value })
    }

    const handleSubmit = () => {
        if(validInformation()) {
            alert('submitted successfully')
        } else {
            alert('error')
        }
    }

    const validInformation = () => {

        let formIsValid = true;
        const { typeSubject, email, name, message } = contactData;
       
        if(typeSubject === ''){
            setFormError({ ...formError, typeSubject: true });
            formIsValid = false;
        } else {
            setFormError({ ...formError, typeSubject: false });
        }

        if(email === ''){
            setFormError({ ...formError, email: true });
            formIsValid = false;
        } else {
            setFormError({ ...formError, email: false });
        }

        if (name === '') {
            setFormError({ ...formError, name: true });
            formIsValid = false;
        } else {
            setFormError({ ...formError, name: false });;
        }

        if (message === '') {
            setFormError({ ...formError, message: true });
            formIsValid = false;
        } else {
            setFormError({ ...formError, message: false });
        }
        
        return formIsValid;
    }

    return (
        <div className='contactForm'>
            <Form className='formInputs'>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        label='Contact Type'
                        options={options}
                        placeholder='Contact Type'
                        onChange={typeChange}
                        name='typeSubject'
                        error={formError.contactType}
                    />
                    <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        onChange={handleChange}
                        name='email'
                        error={formError.email}
                    />
                    <Form.Field
                        control={Input}
                        label='Name'
                        placeholder='Name'
                        value={ currentUser ? currentUser.name : ''}
                        readOnly = { currentUser ? true : false } 
                        onChange={handleChange}
                        name='name'
                        error={formError.name}
                    />
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='Message'
                    placeholder='Type your message here...'
                    onChange={handleChange}
                    name='message'
                    style={{ minHeight: 200 }}
                    error={formError.message}
                />
                <Form.Field className='contactSubmit' color='blue' control={Button} onClick={handleSubmit}>Submit</Form.Field>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps)(ContactFrom);