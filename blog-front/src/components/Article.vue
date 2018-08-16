<template>
  <div>
    <h1>{{article.title}}</h1>
    <p>
      {{article.body}}
    </p>
    <router-link to="/">TOPに戻る</router-link>
  </div>
</template>

<script>
import blogApiClient from '../api/blogApi';

export default {
  name: 'article',
  data() {
    return {
      article: 'aaaaa',
    };
  },
  created() {
    this.listen();
  },
  methods: {
    listen() {
      const url = `/articles/${this.$route.params.id}`;
      blogApiClient.get(url).then((result) => { this.article = result.data; });
    },
  },
};
</script>

<style scoped>

</style>
