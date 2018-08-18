<template>
  <div>
    <h1>{{article.title}}</h1>
    <hr>
    <p>
      {{article.body}}
    </p>
    <hr>
    <ul class="list-unstyled" v-if="article.comments">
      <li v-for="(comment, key) in article.comments" v-bind:key="key">
        <div class="card">
          <div class="card-body">
            <p>
              {{comment.body}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'article-show',
  data() {
    return {
      article: '',
    };
  },
  created() {
    this.listen();
  },
  methods: {
    listen() {
      const url = `/articles/${this.$route.params.id}`;
      this.$http.plain.get(url).then((result) => { this.article = result.data; });
    },
  },
};
</script>

<style>
</style>
