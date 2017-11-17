import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import './App.less'
import Home from './components/home'
import Login from './components/login'

class App extends Component {
  state = {
    token: true,
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            !this.state.token ? <Redirect to="/login"/> : <Home/>
          )}/>
          <Route exact path="/login" render={() => (
            this.state.token ? <Redirect to="/"/> : <Login/>
          )}/>
        </Switch>
      </Router>
    )
  }
}

export default App