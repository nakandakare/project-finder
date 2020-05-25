import React, { useEffect } from 'react';
import './chat-project-members.scss';
import { connect } from 'react-redux';
import { projectMemberFetchStart } from '../../redux/project/project.action';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { selectProjectMembers } from '../../redux/project/project.selectors';
import MemberView from '../member-view/member-view.component';
import { Item } from 'semantic-ui-react'

const ChatProjectMembers = ({ projectMemberFetchStart, location, projectMembers }) => {
    const { id } = queryString.parse(location.search);

    //Fetching members of project selected.
    useEffect(() => {
        projectMemberFetchStart(id);
    }, [location.search])

    return (
        <div>
            <Item.Group>
                {
                    projectMembers.map(({ ...props } /*member*/, i) => <MemberView key={i} {...props} />)
                }
            </Item.Group>
        </div>
    )
}

const mapStateToProps = state => ({
    projectMembers: selectProjectMembers(state)
})

const mapDispatchToProps = dispatch => ({
    projectMemberFetchStart: (id) => dispatch(projectMemberFetchStart(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatProjectMembers));