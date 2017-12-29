import Vue from 'vue';
import Router from 'vue-router';

// Containers
import Full from '@/containers/Full';

// Views
import Dashboard from '@/views/Dashboard';
import Portfolio from '@/views/Portfolio';

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
    }
  ]
});
