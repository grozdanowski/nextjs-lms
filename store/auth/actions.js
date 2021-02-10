export const actionTypes = {
  SET_AUTHENTICATED_USER: 'SET_AUTHENTICATED_USER',
  LOGOUT: 'LOGOUT',
}

export const setAuthenticatedUser = (payload) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_AUTHENTICATED_USER,
    payload: payload,
  })
}

export const setLogout = () => (dispatch) => {
  console.log('logout dispatched');
  return dispatch({
    type: actionTypes.LOGOUT
  })
}