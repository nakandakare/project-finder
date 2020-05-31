import React, { useEffect } from 'react';
import './chat-project-members.scss';
import { connect } from 'react-redux';
import { projectMemberFetchStart, emptyProjectMembers } from '../../redux/project/project.action';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { selectProjectMembers } from '../../redux/project/project.selectors';
import MemberView from '../member-view/member-view.component';
import { Icon } from 'semantic-ui-react'
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

const ChatProjectMembers = ({ projectMemberFetchStart, location, projectMembers, emptyProjectMembers }) => {
    
    //Fetching members of project selected.
    useEffect(() => {
        const { id } = queryString.parse(location.search);
        projectMemberFetchStart(id);
        if(!location.search) {
            emptyProjectMembers();
        }
    }, [location.search])

    const ROOT_CSS = css({
        height: 730,
        width: 420
    });

    return (
        <div>
            <div className="infoBarMembers" />
            
            <div className='headerMembers'>
                <div className='innerHeaderMembers'>
                    <div className='headerIconMembers'>
                        <Icon color='grey' size='big' name='group' />
                    </div>
                    <div className='headerTitleMembers'>
                        <h3>Project Members</h3>
                    </div>
                </div>
            </div>
            <ScrollToBottom className={ROOT_CSS}>
            {
                projectMembers.map(({ ...props } /*member*/, i) => <MemberView key={i} {...props} />)
            }
            </ScrollToBottom>
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