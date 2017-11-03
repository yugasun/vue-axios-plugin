/**
 * Created Date: Friday, November 3rd 2017, 11:38:45 pm
 * Author: yugasun
 * Email: yuga.sun.bj@gmail.com
 * -----
 * Copyright (c) 2017 yugasun
 */
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const views = require('koa-underscore-templates')
const Mock = require('mockjs')
const app = new Koa()
const router = new KoaRouter()
const Random = Mock.Random
const port = 3010

async function Sleep (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time * 1000)
  })
}

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/user_info', async (ctx, next) => {
  // make api sleep 1s
  await Sleep(1)
  ctx.body = Mock.mock(
    {
      'error_code': 0,
      'data': {
        'uid': () => Random.integer(1, 1000),
        'username': 'yugasun',
        'email': 'yuga.sun.bj@gmail.com'
      }
    }
  )
})

app
  .use(views(__dirname))
  .use(KoaStatic(path.join(__dirname, '..', 'dist')))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)

console.log(`Mock server is start on: http://localhost:${port}`)
