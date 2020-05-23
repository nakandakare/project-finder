import React from 'react';
import './info-bar.styles.scss';
import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';

const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/chat"><img src={closeIcon} alt="close icon" /></a>
            </div>
        </div>
        )
}

export default InfoBar;