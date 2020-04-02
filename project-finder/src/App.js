import React from 'react';
import './App.css';
import Header from './components/header/header.component';
import CurrentPath from './components/current-path/current-path.component';
import ProjectsPage from './pages/projects-page/projects-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import RegisterPage from './pages/register-page/register-page.component';
import { Route, useLocation} from 'react-router-dom';

function App() {

  const {pathname} = useLocation(); 

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
          <Route exact path='/signin' component={SignInPage} />
          <Route exact path='/register' component={RegisterPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
