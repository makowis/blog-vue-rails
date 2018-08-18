<template>
  <div class="top">
    <h1>Blog TOP</h1>
    <ul class="list-unstyled">
      <li v-for="(item, key) in articles" v-bind:key="key">
        <div class="card">
          <div class="card-body">
            <p class="h5 card-title">
              <router-link v-bind:to="{ name : 'Article', params : { id: item.id }}">
                {{item.title}}
              </router-link>
            </p>
            <p class="h6 card-subtitle mb-2 text-muted">
              by {{item.user.name}} {{item.created_at}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.listen();
  },
  methods: {
    listen() {
      this.$http.plain.get('/articles').then((result) => { this.articles = result.data; });
    },
  },
};
</script>

<style module></style>
