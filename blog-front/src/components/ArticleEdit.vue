<template>
  <div>
    <h1>Edit Article</h1>
    <form @submit.prevent="updateArticle">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="article.title" type="text" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea v-model="article.body" rows="20" class="form-control" id="body"></textarea>
      </div>
      <button type="submit" class="btn btn-block btn-primary mb-3">Update</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'article-edit',
  data() {
    return {
      article: {
        id: '',
        title: '',
        body: '',
      },
      error: '',
    };
  },
  created() {
    this.checkSignedIn();
    this.setArticle();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
    updateArticle() {
      if (!this.validateArticle()) {
        return;
      }
      this.$http.secured.patch(`/articles/${this.article.id}`, { article: { title: this.article.title, body: this.article.body } })
        .then((response) => {
          const newArticle = response.data;
          this.$router.replace(`/article/${newArticle.id}`);
        })
        .catch(error => this.setError(error, 'Cannot post article'));
    },
    validateArticle() {
      const titleValue = this.article.title && this.article.title.trim();
      if (!titleValue) {
        this.error = 'Title required';
        return false;
      }
      const bodyValue = this.article.body && this.article.body.trim();
      if (!bodyValue) {
        this.error = 'Body required';
        return false;
      }
      return true;
    },
    setArticle() {
      const articleId = this.$route.params.id;
      if (articleId) {
        const url = `/articles/${articleId}`;
        this.$http.plain.get(url).then((result) => {
          this.article = result.data;
        }).catch(error => this.setError(error, 'Cannot get article'));
      }
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
