/**
 * Created Date: Friday, November 3rd 2017, 8:29:28 pm
 * Author: yugasun
 * Email: yuga.sun.bj@gmail.com
 * -----
 * Copyright (c) 2017 yugasun
 */

// https://github.com/axios/axios/issues/683
import axios from 'axios/dist/axios'
import stringify from 'qs/lib/stringify'

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
  withCredentials: false
}

let VueAxiosPlugin = {}

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
          params: data
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
              data = stringify(data)
              return data
            }
          ]
        }
      }
      return axios(axiosOpt).then(resCheck)
    }
  }
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(VueAxiosPlugin)
}

export default VueAxiosPlugin
