import SignInPage from '../../pages/sign-in-page/sign-in-page.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { connect } from 'react-redux';
import { selectIsFetching } from '../../redux/user/user.selectors';
import { compose } from 'redux';

const mapStateToProps = state => ({
    isFetching: selectIsFetching(state)
})

const SignInPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(SignInPage)

export default SignInPageContainer;