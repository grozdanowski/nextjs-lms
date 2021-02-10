import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const LMS_URL = publicRuntimeConfig.openedxLmsUrl || 'http://localhost:18000';
const OPEN_EDX_USER_API = process.env.OPENEDX_USER_API || '/api/user/v1/accounts/';


export const getUserData = (username) => {

  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .get(`${LMS_URL}${OPEN_EDX_USER_API}${username}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

}