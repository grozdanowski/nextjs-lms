import { actionTypes } from './actions'

const authInitialState = {
  userData: {},
}

export default function reducer(state = authInitialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return Object.assign({}, state, {
        userData: action.payload,
      })
    case actionTypes.CLEAR_USER:
      return Object.assign({}, state, {
        userData: {}
      })
    default:
      return state
  }
}