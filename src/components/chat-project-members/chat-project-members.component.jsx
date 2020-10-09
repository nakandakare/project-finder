import React, { useEffect } from 'react';
import './chat-project-members.scss';
import { connect } from 'react-redux';
import { projectMemberFetchStart, emptyProjectMembers } from '../../redux/project/project.action';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { selectProjectMembers } from '../../redux/project/project.selectors';
import MemberView from '../member-view/member-view.component';
import { Icon } from 'semantic-ui-react'

const ChatProjectMembers = ({ projectMemberFetchStart, location, projectMembers, emptyProjectMembers }) => {

    //Fetching members of project selected.
    useEffect(() => {
        const { id } = queryString.parse(location.search);
        projectMemberFetchStart(id);
        if (!location.search) {
            emptyProjectMembers();
        }
    }, [location.search])

    return (
        <div className='projectMembersContainer'>
            <div className='headerMembers'>
                <div className='innerHeaderMembers'>
                    <div className='headerIconMembers'>
                        <Icon color='grey' size='big' name='group' />
                    </div>
                    <div className='headerTitleMembers'>
                        <p>Project Members</p>
                    </div>
                </div>
            </div>
            {
                projectMembers.map(({ ...props }, i) => <MemberView key={i} {...props} />)
            }
        </div>
    )
}

const mapStateToProps = state => ({
    projectMembers: selectProjectMembers(state)
})

const mapDispatchToProps = dispatch => ({
    projectMemberFetchStart: (id) => dispatch(projectMemberFetchStart(id)),
    emptyProjectMembers: () => dispatch(emptyProjectMembers())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatProjectMembers));