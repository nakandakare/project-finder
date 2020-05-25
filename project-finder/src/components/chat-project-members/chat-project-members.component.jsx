import React, {useEffect} from 'react';
import './chat-project-members.scss';
import {connect} from 'react-redux';
import { projectMemberFetchStart} from '../../redux/project/project.action';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import {selectProjectMembers} from '../../redux/project/project.selectors';

const ChatProjectMembers = ({ projectMemberFetchStart, location, projectMembers}) => {
    const { id } = queryString.parse(location.search);
    
    useEffect(() => {
        projectMemberFetchStart(id);
    },[location.search])

    return (
        <div>
            {
                projectMembers.map(member => console.log(member))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    projectMembers: selectProjectMembers(state)
})

const mapDispatchToProps = dispatch => ({
    projectMemberFetchStart: (id) => dispatch(projectMemberFetchStart(id))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChatProjectMembers));