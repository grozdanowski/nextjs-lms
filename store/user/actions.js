import { getUserData } from 'lib/user'

export const actionTypes = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
  PATCH_USER: 'PATCH_USER',
}


export const setCurrentUserData = (username) => (dispatch) => {
  getUserData(username)
    .then((res) => {
      console.log('retrieved response:', res);
      return dispatch({
        type: actionTypes.SET_USER,
        payload: res,
      })
    })
    .catch((err) => {
      console.log('Error fetching user data:', err)
    })
}

export const clearCurrentUserData = () => (dispatch) => {
  return dispatch({
    type: actionTypes.CLEAR_USER,
  })
}