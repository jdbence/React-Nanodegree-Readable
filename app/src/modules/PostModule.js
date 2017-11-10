import { createAction, handleActions } from 'redux-actions'
import { fetchPosts } from 'utils/ArticleAPI'
import { uniqueArray } from 'utils/ArrayUtil'

// Constants
const ADD_POST = 'ADD_POST@Readable'
const REMOVE_POST = 'REMOVE_POST@Readable'
const SET_POSTS = 'SET_POSTS@Readable'

// Actions
export const addPost = createAction(ADD_POST)
export const removePost = createAction(REMOVE_POST)
const setPosts = createAction(SET_POSTS)

export function getPosts(category) {
  return dispatch => fetchPosts(category)
    .then(d => dispatch(setPosts(d)))
}

export const actions = {
  addPost,
  removePost,
  getPosts
}

const initialState = []

export default handleActions(
  {
    [SET_POSTS]: (state, { payload }) => uniqueArray([...state, ...payload]),
    [ADD_POST]: (state, { payload }) => [...state, payload],
    [REMOVE_POST]: (state, { payload }) => state.filter(item => item.id !== payload.id)
  },
  initialState
)