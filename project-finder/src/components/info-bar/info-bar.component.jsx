import React from 'react';
import './info-bar.styles.scss';
import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import Jdenticon from 'react-jdenticon';

const InfoBar = ({ room, projectId }) => {
    return (
        <div className="infoBar">
            <div className="jdenticonInfobar">
            {
                    projectId ? <Jdenticon size="48" value={projectId.toString()} /> : null
            }
            </div>
            <div className="leftInnerContainer">
                {
                    room ? <img className="onlineIcon" src={onlineIcon} alt="online icon" /> : null
                }
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a className="closeIcon" href="/projects"><img src={closeIcon} alt="close icon" /></a>
            </div>
        </div>
        )
}

export default InfoBar;