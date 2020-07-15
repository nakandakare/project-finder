import React, {useEffect} from 'react';
import './App.css';
import Header from './components/header/header.component';
import CurrentPath from './components/current-path/current-path.component';
import ProjectsPage from './pages/projects-page/projects-page.component';
import SignInPageContainer from './pages/sign-in-page/sign-in-page.container';
import RegisterPageContainer from './pages/register-page/register-page.container';
import ChatOverview from './components/chat-overview/chat-overview.component';
import Notification from './components/notificaction/notification.component';
import ContactOverview from './components/contact-overview/contact-overview.component';
import { createStructuredSelector } from 'reselect';
import { checkUserSession} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { projectFetchStart, projectCountStart} from './redux/project/project.action';
import {connect} from 'react-redux';
import {Route, useLocation, Redirect} from 'react-router-dom';
import OutsideAlerter from './components/outside-alerter/outside-alerter.component';

const App = ({ currentUser, checkUserSession, projectFetchStart, projectCountStart}) => {

  const {pathname} = useLocation();

  useEffect(() => {
      checkUserSession();
      projectFetchStart({offset: 0}); //0 to 6 projects on initial render
      projectCountStart();
  }, [checkUserSession, projectFetchStart, pathname])
  
  return (
    <div className="App">
      <div className="header-pf">
        <Header />
      </div>
      <div className="main-content">
        <div className="content-wrapper">
          <Redirect from="/" to="projects" />
          {
            pathname === '/signin' ? null : pathname === '/register' ? null : pathname === '/chat' ? null : <CurrentPath/>
          }
          <Route exact path='/projects' component={ProjectsPage} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/projects' />) : (<SignInPageContainer />)} />
          <Route exact path='/register' render={() => currentUser ? (<Redirect to='/projects' />) : (<RegisterPageContainer />)} />
          <Route path='/chat' render={() => currentUser ? (<ChatOverview />) : (<Redirect to='/signin' />)}/>
          <Route exact path='/contact' component={ContactOverview} />
          <OutsideAlerter>
            <Notification />
          </OutsideAlerter>
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
  projectFetchStart: (offset) => dispatch(projectFetchStart(offset)),
  projectCountStart: () => dispatch(projectCountStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
