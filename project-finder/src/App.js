import React, {useEffect} from 'react';
import './App.css';
import Header from './components/header/header.component';
import CurrentPath from './components/current-path/current-path.component';
import ProjectsPage from './pages/projects-page/projects-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import WithSpinner from './components/with-spinner/with-spinner.component';
import ProjectCreate from './components/project-create/project-create.component';
import SignInPageContainer from './pages/sign-in-page/sign-in-page.container';
import RegisterPageContainer from './pages/register-page/register-page.container';
import { createStructuredSelector } from 'reselect';
import {checkUserSession} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {projectFetchStart} from './redux/project/project.action';
import {connect} from 'react-redux';
import {Route, useLocation, Redirect} from 'react-router-dom';

const SignInPageWithSpinner = WithSpinner(SignInPage);
const RegisterPageWithSpinner = WithSpinner(RegisterPage)

const App = ({ currentUser, checkUserSession, projectFetchStart}) => {

  const {pathname} = useLocation();

  useEffect(() => {
    checkUserSession();
    projectFetchStart();
  }, [checkUserSession, projectFetchStart])
  
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="content-wrapper">
          <ProjectCreate/>
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
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/projects' />) : (<SignInPageContainer />)} />
          <Route exact path='/register' render={() => currentUser ? (<Redirect to='/projects' />) : (<RegisterPageContainer />)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  projectFetchStart: () => dispatch(projectFetchStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
