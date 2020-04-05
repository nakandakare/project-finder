import React, {useEffect} from 'react';
import './App.css';
import Header from './components/header/header.component';
import CurrentPath from './components/current-path/current-path.component';
import ProjectsPage from './pages/projects-page/projects-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import WithSpinner from './components/with-spinner/with-spinner.component';
import {checkUserSession} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {selectIsFetching} from './redux/user/user.selectors';
import {connect} from 'react-redux';
import {Route, useLocation, Redirect} from 'react-router-dom';

const SignInPageWithSpinner = WithSpinner(SignInPage);
const RegisterPageWithSpinner = WithSpinner(RegisterPage)

const App = ({currentUser, isFetching, checkUserSession}) => {

  const {pathname} = useLocation();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
  
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="content-wrapper">
          {
            (() => {
              if (pathname === ('/signin'))
                return null 
              if (pathname === ('/register'))
                return null
              else
                return <CurrentPath />
            })()
          }
          <Route exact path='/projects' component={ProjectsPage} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/projects' />) : (<SignInPageWithSpinner isLoading={isFetching}/>)} />
          <Route exact path='/register' render={() => currentUser ? (<Redirect to='/projects' />) : (<RegisterPageWithSpinner isLoading={isFetching} />)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  isFetching: selectIsFetching(state)
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
