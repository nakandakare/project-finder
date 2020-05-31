import React from 'react';
import './projects-page.styles.scss';
import Filter from '../../components/filter/filter.component';
import ProjectOverviewContainer from '../../components/project-overview/project-overview.container';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { selectProjectCount} from '../../redux/project/project.selectors';
import { projectFetchStart } from '../../redux/project/project.action';
import {connect} from 'react-redux';

const ProjectsPage = ({ match, history, projectCount, projectFetchStart }) => {
    
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(5),
            },
        },
    }));

    const pageChangeHandler = (event, page) => {
        if(page > 1) {
            const offset = ((parseInt(page) - 1) * 6);
            projectFetchStart({ offset });
        } else {
            projectFetchStart({ offset: 0 });
        }
    }

    const classes = useStyles();
    return (
        <div className='projects-page'>
            <Filter className='projects-filter' match={match} history={history} />
            <div className='projectsView'>
                <ProjectOverviewContainer projectCount={projectCount}/>
                <div className={`${classes.root}`}>
                    <Pagination onChange={pageChangeHandler} count={Math.ceil(projectCount[0].count / 6)} color="primary" size='medium' />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    projectCount: selectProjectCount(state)
})

const mapDispatchToProps = (dispatch) => ({
    projectFetchStart: (offset) => dispatch(projectFetchStart(offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);