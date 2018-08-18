<template>
  <div>
    <h1>{{article.title}}</h1>
    <hr>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div v-if="hasArticle()" class="mb-3">
      <router-link :to="{ path: `/article/${article.id}/edit` }" class="btn btn-outline-primary">
        <i class="fas fa-edit"></i>
        Edit
      </router-link>
      <button @click="deleteArticle" type="button" class="btn btn-outline-danger">
        <i class="fas fa-eraser"></i>
        Delete
      </button>
    </div>
    <div class="mb-5">
      <p :class="$style.articleBody">{{article.body}}</p>
    </div>

    <ul v-if="article.comments" class="list-unstyled mb-3">
      <li v-for="(comment) in article.comments" v-bind:key="comment.id" class="mb-2">
        <div class="card">
          <div class="card-body">
            <p class="m-0">
              {{comment.body}}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="isSignedIn()" class="card">
      <div class="card-header">
        Post comment
      </div>
      <div class="card-body">
        <form @submit.prevent="addComment">
          <div class="form-group">
            <label for="comment-body">comment</label>
            <textarea v-model="commentBody" class="form-control"
                      id="comment-body" rows="5"></textarea>
          </div>
          <button type="submit" class="btn btn-block btn-primary mb-3">Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-show',
  data() {
    return {
      article: '',
      user: '',
      commentBody: '',
      error: '',
    };
  },
  created() {
    this.listen();
  },
  methods: {
    listen() {
      const url = `/articles/${this.$route.params.id}`;
      this.$http.plain.get(url).then((result) => { this.article = result.data; });

      this.$http.secured.get('/auth_user').then((userResult) => {
        this.user = userResult.data;
      });
    },
    isSignedIn() {
      return localStorage.signedIn;
    },
    addComment() {
      const commentBodyValue = this.commentBody && this.commentBody.trim();
      if (!commentBodyValue) {
        return;
      }
      this.$http.secured.post(`/articles/${this.article.id}/comments`, { comment: { body: this.commentBody } })
        .then((response) => {
          this.commentBody = '';
          this.article.comments.unshift(response.data);
        })
        .catch(error => this.setError(error, 'Cannot post comment'));
    },
    hasArticle() {
      return this.user.id === this.article.user_id;
    },
    deleteArticle() {
      this.$http.secured.delete(`/articles/${this.article.id}`)
        .then(() => {
          this.$router.replace('/');
        })
        .catch(error => this.setError(error, 'Cannot delete article'));
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
  },
};
</script>

<style module>
.articleBody {
  white-space: pre-wrap;
}
</style>
