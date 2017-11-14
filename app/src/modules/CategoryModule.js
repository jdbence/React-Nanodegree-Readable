import { createAction, handleActions } from 'redux-actions'
import { fetchCategoriesAPI } from 'utils/ArticleAPI'

// Constants
const ADD_CATEGORY = 'ADD_CATEGORY@Readable'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY@Readable'
const FETCH_CATEGORIES = 'FETCH_CATEGORIES@Readable'

// Actions
export const addCategory = createAction(ADD_CATEGORY)
export const removeCategory = createAction(REMOVE_CATEGORY)
const setCategoriesComplete = createAction(FETCH_CATEGORIES)

export function fetchCategories() {
  return dispatch => fetchCategoriesAPI()
    .then(d => dispatch(setCategoriesComplete(d)))
}

export const actions = {
  addCategory,
  removeCategory,
  fetchCategories
}

const initialState = []

export default handleActions(
  {
    [FETCH_CATEGORIES]: (state, { payload }) => payload,
    [ADD_CATEGORY]: (state, { payload }) => [...state, payload],
    [REMOVE_CATEGORY]: (state, { payload }) => state.filter(item => item.id !== payload.id)
  },
  initialState
)