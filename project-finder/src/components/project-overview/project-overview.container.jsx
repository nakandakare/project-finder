import WithSpinner from '../with-spinner/with-spinner.component';
import ProjectOverview from '../project-overview/project-overview.component';
import {connect} from 'react-redux';
import { selectIsFetching } from '../../redux/project/project.selectors';
import {compose} from 'redux';

const mapStateToProps = state => ({
    isFetching: selectIsFetching(state)
})

const ProjectOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(ProjectOverview)

export default ProjectOverviewContainer;