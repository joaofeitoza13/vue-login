import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //auth check
    const token = localStorage.getItem('token')
    if (token) {
      //token check
      console.log(`${token}. TOKEN VALIDATED.`)
      return next()
    }
    console.log(`${token}. TOKEN NOT VALIDATED. PLEASE, LOGIN.`)
    return next('/login')
  }

  next()
})
