import React from 'react';
import './filter.styles.scss';

const Filter = ({match}) => {

    return (
        <div className='filter-box'>
            <div className='search-filter-container'>
                <ul className='tab-container'>
                    <li className='tab-project-search'>
                        <p>Project Search</p>
                    </li>
                    <li className='tab-member-search'>
                        <p>Member Search</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Filter;