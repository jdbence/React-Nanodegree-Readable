import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

export default function ReduxDecorator(reducers, initialState = {}) {
  const store = createStore(reducers, initialState)

  class ReduxProvider extends React.Component {
    shouldComponentUpdate() {
      return false
    }
    render() {
      const { children } = this.props
      return (
        <Provider store={store}>
          {children}
        </Provider>
      )
    }
  }

  return story =>
    <ReduxProvider store={store}>
      {story()}
    </ReduxProvider>
}