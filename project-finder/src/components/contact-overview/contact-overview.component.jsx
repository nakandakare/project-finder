import React from 'react';
import './contact-overview.styles.scss';
import ContactFrom from '../contact-form/contact-form.component';

const ContactOverview = () => {
    return (
        <div className='contactOverview'>
            <ContactFrom />
        </div>
    )
}

export default ContactOverview;