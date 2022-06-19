import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Visitor from '@/views/visitor'
import Employee from '@/views/employee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/visitor',
      name: 'Visitor',
      component: Visitor
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { title: '登录' }
        }
      ]
    },
    
  ]
})
