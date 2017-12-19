import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import { Provider } from 'react-redux'
import Home from './components/home'
import Login from './components/login'
import { store } from './stores/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App