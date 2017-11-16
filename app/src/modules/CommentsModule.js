import { createAction, handleActions } from 'redux-actions'
import { fetchCommentsAPI, createCommentAPI, deleteCommentAPI, updateCommentAPI, voteCommentAPI } from 'utils/ArticleAPI'
import { uniqueArray } from 'utils/ArrayUtil'

// Constants
const CREATE_COMMENT = 'CREATE_COMMENT@Readable'
const DELETE_COMMENT = 'DELETE_COMMENT@Readable'
const FETCH_COMMENTS = 'FETCH_COMMENTS@Readable'
const UPDATE_COMMENT = 'UPDATE_COMMENT@Readable'

// Actions
const createCommentComplete = createAction(CREATE_COMMENT)
const deleteCommentComplete = createAction(DELETE_COMMENT)
const fetchCommentsComplete = createAction(FETCH_COMMENTS)
const updateCommentComplete = createAction(UPDATE_COMMENT)

export function fetchComments(id) {
  return dispatch => fetchCommentsAPI(id)
    .then(comments => dispatch(fetchCommentsComplete(comments)))
}

export function createComment(comment){
  return dispatch => createCommentAPI(comment)
    .then(d => dispatch(createCommentComplete(d)))
}

export function deleteComment(id) {
  return dispatch => deleteCommentAPI(id)
    .then(() => dispatch(deleteCommentComplete(id)))
}

export function updateComment(comment) {
  return dispatch => updateCommentAPI(comment)
    .then(() => dispatch(updateCommentComplete(comment)))
}

export function voteComment(id, option){
  return dispatch => voteCommentAPI({id, option})
    .then(response => dispatch(updateCommentComplete(response.data)))
}

export const actions = {
  createComment,
  deleteComment,
  updateComment,
  voteComment,
  fetchComments
}

const initialState = []

export default handleActions(
  {
    [FETCH_COMMENTS]: (state, { payload }) => uniqueArray([...state, ...payload]),
    [CREATE_COMMENT]: (state, { payload }) => uniqueArray([...state, payload]),
    [DELETE_COMMENT]: (state, { payload }) => state.filter(item => item.id !== payload),
    [UPDATE_COMMENT]: (state, { payload }) => state.map((e) => e.id === payload.id ? {...e, ...payload} : e)
  },
  initialState
)