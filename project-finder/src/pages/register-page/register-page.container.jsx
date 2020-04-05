import RegisterPage from '../../pages/register-page/register-page.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { connect } from 'react-redux';
import { selectIsFetching } from '../../redux/user/user.selectors';
import { compose } from 'redux';

const mapStateToProps = state => ({
    isFetching: selectIsFetching(state)
})

const RegisterPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(RegisterPage)

export default RegisterPageContainer;