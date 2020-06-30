import React, {useState, useEffect} from 'react';
import './contact-from.styles.scss';
import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { sendContactData } from '../../redux/user/user.actions';
import Swal from 'sweetalert2'; 
import { Header, Icon } from 'semantic-ui-react'

const ContactFrom = ({ currentUser, sendContactData }) => {

    const [contactData, setContactData] = useState({ subjectType: '', email: '', name: '', message: ''})
    const [formError, setFormError] = useState({ subjectType: false, email: false, name: false, message: false })
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
        setContactData({...contactData, [name]: value });
    }

    const handleSubmit = () => {
        if(validInformation()) {
            sendContactData(contactData);
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: 'swal-height',
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Message sent successfully'
            })
        } 
    }

    const validInformation = () => {

        let formIsValid = true;
        const { subjectType, email, name, message } = contactData;
        let subjectTypeError = false;
        let emailError = false;
        let nameError = false;
        let messageError = false;
        
        if (subjectType === ''){
            subjectTypeError = true;
            formIsValid = false;
        } 

        if(email === ''){
            emailError = true;
            formIsValid = false;
        } else {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(email)){
                emailError = true;
                formIsValid = false;
            }
        }

        if (name === '') {
            nameError = true;
            formIsValid = false;
        } 

        if (message === '') {
            messageError = true;
            formIsValid = false;
        } 
    
        setFormError({ subjectType: subjectTypeError, email: emailError, name: nameError, message: messageError });
        return formIsValid;
    }

    const resetFormError = (key) => {
        setFormError({...formError, [key]: false });
    }

    return (
        <div className='contactForm'>
            <Header className='contactHeader' as='h2'>
                <Icon name='mail' />
                <Header.Content>Contact me!</Header.Content>
            </Header>
            <Form className='formInputs' onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        label='Contact Type'
                        options={options}
                        placeholder='Contact Type'
                        onChange={typeChange}
                        onClick={() => resetFormError('subjectType')}
                        name='subjectType'
                        error={formError.subjectType}
                    />
                    <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        onChange={handleChange}
                        onClick={() => resetFormError('email')}
                        name='email'
                        error={formError.email}
                    />
                    <Form.Field
                        control={Input}
                        label='Name'
                        placeholder='Name'
                        value={ currentUser ? currentUser.name : null}
                        readOnly = { currentUser ? true : false } 
                        onChange={handleChange}
                        onClick={() => resetFormError('name')}
                        name='name'
                        error={formError.name}
                    />
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='Message'
                    placeholder='Type your message here...'
                    onChange={handleChange}
                    onClick={() => resetFormError('message')}
                    name='message'
                    style={{ minHeight: 200 }}
                    error={formError.message}
                />
                <Form.Field className='contactSubmit' color='blue' control={Button} >Submit</Form.Field>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
    sendContactData: (contactData) => dispatch(sendContactData(contactData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactFrom);