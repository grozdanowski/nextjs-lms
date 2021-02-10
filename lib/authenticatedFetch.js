import axios from 'axios'

const LMS_URL = process.env.OPENEDX_LMS_URL || 'http://localhost:18000';

export const authenticatedFetch = async( urlParameter ) => {

  return new Promise((resolve, reject) => {

    axios.defaults.withCredentials = true;
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .get(`${LMS_URL}${urlParameter}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
  })
}