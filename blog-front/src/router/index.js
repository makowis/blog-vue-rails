import Vue from 'vue';
import Router from 'vue-router';
import Top from '@/components/Top';
import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import Article from '@/components/Article';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article,
    },
  ],
});
