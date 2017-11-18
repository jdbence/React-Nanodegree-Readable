import { createAction, handleActions } from 'redux-actions'
import { fetchPostsAPI, createPostAPI, deletePostAPI, updatePostAPI, votePostAPI } from 'utils/ArticleAPI'
import { uniqueArray } from 'utils/ArrayUtil'

// Constants
const CREATE_POST = 'CREATE_POST@Readable'
const DELETE_POST = 'DELETE_POST@Readable'
const FETCH_POSTS = 'FETCH_POSTS@Readable'
const UPDATE_POST = 'UPDATE_POST@Readable'

// Actions
const createPostComplete = createAction(CREATE_POST)
const deletePostComplete = createAction(DELETE_POST)
const fetchPostsComplete = createAction(FETCH_POSTS)
const updatePostComplete = createAction(UPDATE_POST)

export function fetchPosts(category) {
  return dispatch => fetchPostsAPI(category).then(posts => dispatch(fetchPostsComplete(posts)))
}

export function createPost(post) {
  return dispatch => createPostAPI(post).then(d => dispatch(createPostComplete(d)))
}

export function deletePost(id) {
  return dispatch => deletePostAPI(id).then(() => dispatch(deletePostComplete(id)))
}

export function updatePost(post) {
  return dispatch => updatePostAPI(post).then(() => dispatch(updatePostComplete(post)))
}

export function votePost(id, option) {
  return dispatch => votePostAPI({ id, option }).then(post => dispatch(updatePostComplete(post)))
}

export const actions = {
  createPost,
  deletePost,
  updatePost,
  votePost,
  fetchPosts
}

const initialState = []

export default handleActions(
  {
    [FETCH_POSTS]: (state, { payload }) => uniqueArray([...state, ...payload]),
    [CREATE_POST]: (state, { payload }) => uniqueArray([...state, payload]),
    [DELETE_POST]: (state, { payload }) => state.filter(item => item.id !== payload),
    [UPDATE_POST]: (state, { payload }) => state.map(e => (e.id === payload.id ? { ...e, ...payload } : e))
  },
  initialState
)
