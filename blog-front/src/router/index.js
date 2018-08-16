import Vue from 'vue';
import Router from 'vue-router';
import Top from '@/components/Top';
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
      path: '/article/:id',
      name: 'Article',
      component: Article,
    },
  ],
});
