import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
          <Route exact path='/login' component={Login}/>
          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App