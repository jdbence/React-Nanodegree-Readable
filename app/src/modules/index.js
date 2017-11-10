import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {default as categoryReducer} from './CategoryModule'
import {default as postReducer} from './PostModule'

export default combineReducers({
  router: routerReducer,
  categories: categoryReducer,
  posts: postReducer,
})
