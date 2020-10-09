import React from 'react';
import './info-bar.styles.scss';
import onlineIcon from '../../assets/onlineIcon.png';
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
                {
                room ? <p className='projectTitle'>{room.split(' ').map(name => name.charAt(0).toUpperCase() + name.substring(1)).join(' ')}</p> : null
                }
            </div>
        </div>
        )
}

export default InfoBar;