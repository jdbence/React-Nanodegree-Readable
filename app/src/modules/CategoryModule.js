import { createAction, handleActions } from 'redux-actions'
import { fetchCategories } from 'utils/ArticleAPI'

// Constants
const ADD_CATEGORY = 'ADD_CATEGORY@Readable'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY@Readable'
const SET_CATEGORIES = 'SET_CATEGORIES@Readable'

// Actions
export const addCategory = createAction(ADD_CATEGORY)
export const removeCategory = createAction(REMOVE_CATEGORY)
const setCategories = createAction(SET_CATEGORIES)

export function getCategories() {
  return dispatch => fetchCategories()
    .then(d => dispatch(setCategories(d)))
}

export const actions = {
  addCategory,
  removeCategory,
  getCategories
}

const initialState = []

export default handleActions(
  {
    [SET_CATEGORIES]: (state, { payload }) => payload,
    [ADD_CATEGORY]: (state, { payload }) => [...state, payload],
    [REMOVE_CATEGORY]: (state, { payload }) => state.filter(item => item.id !== payload.id)
  },
  initialState
)