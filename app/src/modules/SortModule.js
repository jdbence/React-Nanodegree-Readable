import { createAction, handleActions } from 'redux-actions'

// Constants
const SET_SORT = 'SET_SORT@Readable'

// Actions
export const setSort = createAction(SET_SORT)

export const actions = {
  setSort
}

export const ALPHA = { type: 'Az' }
export const DATE = { type: 'Date' }
export const RATING = { type: 'Rating' }
const initialState = DATE

export default handleActions(
  {
    [SET_SORT]: (state, { payload }) => payload
  },
  initialState
)
