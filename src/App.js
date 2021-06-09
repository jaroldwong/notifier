import Header from './components/Header';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Compose from './pages/Compose';
import Notices from './pages/Notices';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Notices />
        </Route>
        <Route path="/compose">
          <Compose />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
