import router from './router'
import Nprogress from 'nprogress'

router.beforeEach((to, from, next) => {
  console.log(to, from)
  Nprogress.start()
  next()
})

router.afterEach((to, from) => {
  console.log(to, from)
  Nprogress.done()
})
