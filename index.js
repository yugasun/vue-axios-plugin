/**
 * Created by Yuga on 2017/2/21.
 */
import axios from 'axios'
import QS from 'qs'

function defaultCheckStatus (response) {
  return response
}

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
)

const VueAxiosPlugin = {}

/**
 * JSON stringify the properties who's type if object
 *
 * @param {any} obj
 * @returns
 */
function jsonProp (obj) {
  Object.keys(obj).forEach((key) => {
    if ((typeof obj[key]) === 'object') {
      obj[key] = JSON.stringify(obj[key])
    }
  })
  return obj
}

/**
 * default axios config
 */
const defaultConfig = {
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  withCredentials: true
}

/**
 * options.checkStatus: default uniform handler for get/post method
 */
VueAxiosPlugin.install = (Vue, options) => {
  let resCheck = (options && options.checkStatus && typeof (options.checkStatus) === 'function') ? options.checkStatus : defaultCheckStatus
  Vue.prototype.$axios = axios
  Vue.prototype.$http = {
    get: (url, data, options) => {
      let axiosOpt = {
        ...defaultConfig,
        ...options,
        ...{
          method: 'get',
          url: url,
          params: data.params
        }
      }
      return axios(axiosOpt).then(resCheck)
    },
    post: (url, data, options) => {
      let axiosOpt = {
        ...defaultConfig,
        ...options,
        ...{
          method: 'post',
          url: url,
          data: data,
          transformRequest: [
            function (data) {
              data = jsonProp(data)
              data = QS.stringify(data)
              return data
            }
          ]
        }
      }
      return axios(axiosOpt).then(resCheck)
    }
  }
}

export default VueAxiosPlugin
