import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import {HomeRoute, PostRoute, CategoryRoute} from 'components/routes'
import store, {history} from './store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" exact component={HomeRoute} />
            <Route path="/post/:id" exact component={PostRoute} />
            <Route path="/:category" exact component={CategoryRoute} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
