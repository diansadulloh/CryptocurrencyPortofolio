import Vue from 'vue';
import Router from 'vue-router';

// Containers
import Full from '@/containers/Full';

// Views
import Dashboard from '@/views/Dashboard';
import Portfolio from '@/views/Portfolio';
import Login from '@/views/LoginOrRegister';
import Logout from '@/views/Logout';

import auth from '../auth';

// Check the users auth status when the app starts
auth.checkAuth();

Vue.use(Router);

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => { return { y: 0 }; },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'portfolio',
          name: 'Portfolio',
          component: Portfolio
        }
      ]
    },
    {
      path: '/user',
      redirect: '/user/login',
      name: 'User',
      component: { render(c) { return c('router-view'); } },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'logout',
          name: 'Logout',
          component: Logout
        }
      ]
    }
  ]
});
