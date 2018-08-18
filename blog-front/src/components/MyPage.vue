<template>
  <div>
    <h1>My Page</h1>
    <p>Id: {{user.id}}</p>
    <p>Name: {{user.name}}</p>
    <section>
      <h2>Blog's</h2>
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
    </section>
  </div>
</template>

<script>
export default {
  name: 'my-page',
  data() {
    return {
      user: '',
      articles: [],
    };
  },
  created() {
    this.checkSignedIn();
    this.listen();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    listen() {
      this.$http.secured.get('/auth_user').then((userResult) => {
        this.user = userResult.data;
        this.$http.plain.get(`users/${this.user.id}/articles`).then((result) => { this.articles = result.data; });
      });
    },
    checkSignedIn() {
      if (!localStorage.signedIn) {
        this.$router.replace('/');
      }
    },
  },
};
</script>

<style scoped>
</style>
