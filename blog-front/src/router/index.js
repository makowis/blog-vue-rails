import Vue from 'vue';
import Router from 'vue-router';
import Top from '@/components/Top';
import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import ArticleForm from '@/components/ArticleForm';
import ArticleEdit from '@/components/ArticleEdit';
import Article from '@/components/Article';
import MyPage from '@/components/MyPage';

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
      path: '/article/new',
      name: 'ArticleNew',
      component: ArticleForm,
    },
    {
      path: '/article/:id/edit',
      name: 'ArticleEdit',
      component: ArticleEdit,
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
    },
  ],
});
