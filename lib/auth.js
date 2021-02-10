import Cookies from 'js-cookie'
import axios from 'axios'
import querystring from 'querystring'
import jwtDecode from 'jwt-decode'

const LMS_URL = process.env.OPENEDX_LMS_URL || 'http://localhost:18000';
const JWT_NAME = process.env.OPENEDX_JWT_NAME || 'edx-jwt-cookie-header-payload';

// registration
// TODO...

// login

export const login = (email, password) => {

  // prevent from running on server
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    email: email,
    password: password,
  };

  const requestConfig = {
    isPublic: true,
  };

  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .post(`${LMS_URL}/login_ajax`, querystring.stringify(payload), requestConfig)
      .then((res) => {
        console.log('test', res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
  })

}

export const logout = async() => {

  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .post(`${LMS_URL}/logout`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const decodeJwtCookie = () => {
  const cookieValue = Cookies.get(JWT_NAME);
  
  if (cookieValue) {
    try {
      return jwtDecode(cookieValue);
    } catch (e) {
      const error = Object.create(e);
      error.message = 'Error decoding JWT token';
      error.customAttributes = { cookieValue };
      throw error;
    }
  }

  return null;
}

const isTokenExpired = (token) => {
  return !token || token.exp < Date.now() / 1000;
}

const refreshJwtToken = async() => {

  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${LMS_URL}/login_refresh`)
      .then((res) => {
        console.log('Error in token refresh endpoint', error);
      })
      .catch((error) => {
        console.log('Error while initiating the token refresh:', error)
      })
  })
}

export const getJwtToken = async() => {
  const decodedJwtToken = decodeJwtCookie(JWT_NAME);

  if (!isTokenExpired(decodedJwtToken)) {
    return decodedJwtToken
  } else {
    try {
      return await refreshJwtToken()
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}