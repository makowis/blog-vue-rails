<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand">Blog</router-link>
      <div v-if="idSignedIn()" class="ml-auto">
        <router-link to="/article/new" class="btn btn-outline-success my-2">
          <i class="fas fa-pen-fancy"></i>New Article
        </router-link>
        <button @click="signOut" class="btn btn-outline-danger my-2" type="submit">Sign out</button>
      </div>
      <div v-else>
        <router-link to="/signin" class="btn btn-outline-success my-2">Sign in</router-link>
        <router-link to="/signup" class="btn btn-outline-info my-2">Sign up</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    signOut() {
      this.$http.secured.delete('/signin')
        .then(() => {
          delete localStorage.csrf;
          delete localStorage.signedIn;
          this.$router.replace('/');
        })
        .catch(error => this.setError(error, 'Cannot sign out'));
    },
    idSignedIn() {
      return localStorage.signedIn;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
