import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import categoryReducer from './CategoryModule'
import postReducer from './PostModule'
import sortReducer from './SortModule'

export default combineReducers({
  router: routerReducer,
  categories: categoryReducer,
  posts: postReducer,
  sort: sortReducer,
})
