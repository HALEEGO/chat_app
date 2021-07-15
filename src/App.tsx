import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './app/components/main';
import Talk from './app/components/talk';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Main />} />
      <Route path="/talk" exact component={Talk} />
    </Switch>
  </Router>
);

export default App;
