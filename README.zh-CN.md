## vue-axios-plugin

[![Build Status](https://travis-ci.org/yugasun/vue-axios-plugin.svg?branch=master)](https://travis-ci.org/yugasun/vue-axios-plugin)
<a href="https://www.npmjs.com/package/vue-axios-plugin"><img src="https://img.shields.io/npm/dm/vue-axios-plugin.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-axios-plugin"><img src="https://img.shields.io/npm/v/vue-axios-plugin.svg" alt="Version"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

简体中文 | [English](./README.md)

Vuejs 项目的 axios 插件

## 如何使用

### 通过 Script 标签

```html
<!-- 在 vue.js 之后引入 -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-axios-plugin"></script>
```

### npm 模块引入

首先通过 npm 安装

```bash
npm install --save vue-axios-plugin
```

然后在入口文件配置如下:

```javascript
import Vue from 'Vue'
import VueAxiosPlugin from 'vue-axios-plugin'

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
```

## 配置参数

除了 `axios` 提供的默认 [请求配置](https://github.com/axios/axios#request-config), `vue-axios-plugin` 也提供了 `request/response` 拦截器配置，如下:

|参数名|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**[`reqHandleFunc`](#)**|`{Function}`|`config => config`|请求发起前的拦截处理函数|
|**[`reqErrorFunc`](#)**|`{Function}`|`error => Promise.reject(error)`|处理请求错误的函数|
|**[`resHandleFunc`](#)**|`{Function}`|`response => response`|响应数据处理函数|
|**[`resErrorFunc`](#)**|`{Function}`|`error => Promise.reject(error)`| 响应错误处理函数 |

## 示例

在 Vue 组件上添加了 `$http` 属性, 它默认提供 `get` 和 `post` 方法，使用如下:

```javascript
this.$http.get(url, data, options).then((response) => {
  console.log(response)
})
this.$http.post(url, data, options).then((response) => {
  console.log(response)
})
```

你也可以通过 `this.$axios` 来使用 `axios` 所有的 api 方法，如下：

```javascript
this.$axios.get(url, data, options).then((response) => {
  console.log(response)
})

this.$axios.post(url, data, options).then((response) => {
  console.log(response)
})
```

## TODO

- [ ] Unit test.

## 注意!!!

当你 header 设置为 `application/x-www-form-urlencoded` 时, 你需要使用 [qs](https://github.com/ljharb/qs) 来转换 post 数据, 如下:

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

但是如果 post 数据对象属性值含有 `object/array`，你就需要将这些属性值转化为 `JSON` 字符串，不然后端接受的的数据将无法解析，方法如下：

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

更多使用方式, 参考 [axios](https://github.com/mzabriskie/axios)

## License

MIT
