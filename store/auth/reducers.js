import { actionTypes } from './actions'

const authInitialState = {
  userAuthenticated: false,
  tokenInfo: {},
}

export default function reducer(state = authInitialState, action) {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED_USER:
      return Object.assign({}, state, {
        userAuthenticated: action.payload.userAuthenticated,
        tokenInfo: action.payload.tokenInfo,
      })
    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        userAuthenticated: false,
        tokenInfo: {},
      })
    default:
      return state
  }
}