import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import {HomeRoute, PostRoute, CategoryRoute} from 'components/routes'
import store, {history} from './store'
import 'whatwg-fetch'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" exact component={HomeRoute} />
            <Route path="/:category" exact component={CategoryRoute} />
            <Route path="/:category/:post_id" exact component={PostRoute} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
