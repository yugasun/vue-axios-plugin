## vue-axios-plugin

[![Build Status](https://travis-ci.org/yugasun/vue-axios-plugin.svg?branch=master)](https://travis-ci.org/yugasun/vue-axios-plugin)
<a href="https://www.npmjs.com/package/vue-axios-plugin"><img src="https://img.shields.io/npm/dm/vue-axios-plugin.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-axios-plugin"><img src="https://img.shields.io/npm/v/vue-axios-plugin.svg" alt="Version"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

axios plugin for Vuejs project

## How to install

### Script tag

```html
<!-- add it after vue.js -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-axios-plugin"></script>
```

### CommonJS

```bash
npm install --save vue-axios-plugin
```

And in your entry file:

```javascript
import Vue from 'Vue'
import VueAxiosPlugin from 'vue-axios-plugin'

Vue.use(VueAxiosPlugin, {
  // request interceptor handler
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // response interceptor handler
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
```

## Options

Except axios default [request options](https://github.com/axios/axios#request-config), `vue-axios-plugin` provide below request/response interceptors options:

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`reqHandleFunc`](#)**|`{Function}`|`config => config`|The handler function for request, before request is sent|
|**[`reqErrorFunc`](#)**|`{Function}`|`error => Promise.reject(error)`|The error function for request error|
|**[`resHandleFunc`](#)**|`{Function}`|`response => response`|The handler function for response data|
|**[`resErrorFunc`](#)**|`{Function}`|`error => Promise.reject(error)`| The error function for response error |

## Usage

Default method in `$http`, it just contains get and post method:

```javascript
this.$http.get(url, data, options).then((response) => {
  console.log(response)
})
this.$http.post(url, data, options).then((response) => {
  console.log(response)
})
```

Use axios original method in `$axios`, by this, you can use all allowed http methods: get,post,delete,put...

```javascript
this.$axios.get(url, data, options).then((response) => {
  console.log(response)
})

this.$axios.post(url, data, options).then((response) => {
  console.log(response)
})
```

## ChangeLog for v1.3.0

Before v1.3.0, it send a request use `application/x-www-form-urlencoded` format by default, so it config `transformRequest` for post request by default, but it is unreasonable. So in v1.3.0, I remove it, all configuration depends on yourself, so you can config the `Content-Type` and `transformRequest` depend on your backend service.

## TODO

- [] Unit test.

## Notice!!!

When you send a request use `application/x-www-form-urlencoded` format, you need to use [qs]() library to transform post data, like below:

```js
import qs from 'qs'
this.$http.post(url, qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}).then((response) => {
  console.log(response)
})
```

But if the `data` has properties who's type if object/array, you need convert these properties into JSON string:

```js
import qs from 'qs'

function jsonProp (obj) {
  // type check
  if (!obj || (typeof obj !== 'object')) {
    return obj
  }
  Object.keys(obj).forEach((key) => {
    if ((typeof obj[key]) === 'object') {
      obj[key] = JSON.stringify(obj[key])
    }
  })
  return obj
}

this.$http.post(url, qs.stringify(data), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    function (data) {
      // if data has object type properties, need JSON.stringify them.
      return qs.stringify(jsonProp(data))
    }
  ]
}).then((response) => {
  console.log(response)
})
```

More usage, view [axios](https://github.com/mzabriskie/axios)

## License

MIT
