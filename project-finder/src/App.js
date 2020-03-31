import React from 'react';
import './App.css';
import Header from './components/header/header.component';
import CurrentPath from './components/current-path/current-path.component';
import ProjectsPage from './pages/projects-page/projects-page.component';
import { Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="content-wrapper">
          <CurrentPath />
          <Route exact path='/projects' component={ProjectsPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
