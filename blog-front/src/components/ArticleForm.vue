<template>
  <div>
    <h1>Post Article</h1>
    <form @submit.prevent="addArticle">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea v-model="body" rows="20" class="form-control" id="body"></textarea>
      </div>
      <button type="submit" class="btn btn-block btn-primary mb-3">Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'article-form',
  data() {
    return {
      title: '',
      body: '',
      error: '',
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
    addArticle() {
      const titleValue = this.title && this.title.trim();
      if (!titleValue) {
        return;
      }
      const bodyValue = this.body && this.body.trim();
      if (!bodyValue) {
        return;
      }
      this.$http.secured.post('/articles', { article: { title: this.title, body: this.body } })
        .then((response) => {
          const newArticle = response.data;
          this.$router.replace(`/article/${newArticle.id}`);
        })
        .catch(error => this.setError(error, 'Cannot create todo'));
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
