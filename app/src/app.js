import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { PostRoute, CategoryRoute, CreateRoute } from 'components/routes'
import store, { history } from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CategoryRoute} />
            <Route path="/create" exact component={CreateRoute} />
            <Route path="/:category" exact component={CategoryRoute} />
            <Route path="/:category/:post_id" component={PostRoute} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
