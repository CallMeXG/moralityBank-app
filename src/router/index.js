import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)
const router = new Router({
  routes,
})
/*
router.beforeEach((to, from, next) => {


  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type

  let guide = localStorage.getItem('Guide')
  if (type === 'guide') {
    if (guide === null)
    {
      // next('guide')
      next('/')
      localStorage.setItem('Guide','1')
    }
    else {

        next()
    }
  }
  else {
    next()
  }



})

// */


export default router

