import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/ebank/login" component={Login} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
