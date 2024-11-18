import React from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import Home from './views/Home';
    import Lesson from './views/Lesson';
    import ProjectSubmission from './views/ProjectSubmission';
    import CapstoneCollaboration from './views/CapstoneCollaboration';
    import Dashboard from './views/Dashboard';

    function App() {
      return (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/lesson/:id" component={Lesson} />
            <Route path="/project-submission" component={ProjectSubmission} />
            <Route path="/capstone-collaboration" component={CapstoneCollaboration} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      );
    }

    export default App;
