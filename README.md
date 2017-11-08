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
<script src="https://unpkg.com/vue@2.5.2/dist/vue.min.js"></script>
<script src="https://unpkg.com/vue-axios-plugin"></script>
<script>
  Vue.use(VueAxiosPlugin.default)
</script>
```

### CommonJS

```bash
npm install --save vue-axios-plugin
```

And in your entry file:

```javascript
import Vue from 'Vue'
import VueAxiosPlugin from 'vue-axios-plugin'

const checkStatus = (response) => {
  if(response.status === 404){
    // do something
  }
  if(response.status === 500){
    //do something
  }

  // after your uniform request handler, you must return response
  return response
}

Vue.use(VueAxiosPlugin, {
  checkStatus: checkStatus
})
```

## Usage

default method in `$http` :

```javascript
this.$http.get(url, data, options).then((response) => {
  console.log(response.data)
})
this.$http.post(url, data, options).then((response) => {
  console.log(response.data)
})
```

use axios original method in `$axios`

```javascript
this.$axios.get(url).then((response) => {
  console.log(response.data)
})

import qs from 'qs'
this.$axios.post(url, qs.stringify(data).then((response) => {
  console.log(response.data)
})
```

More usage, go to [axios](https://github.com/mzabriskie/axios)

## License

MIT
