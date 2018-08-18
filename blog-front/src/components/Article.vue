<template>
  <div>
    <h1>{{article.title}}</h1>
    <hr>
    <p>
      {{article.body}}
    </p>
    <div v-if="isSignedIn()">
      <p>Post comment</p>
      <form @submit.prevent="addComment">
        <div class="form-group">
          <label for="comment-body">comment</label>
          <textarea v-model="commentBody" class="form-control"
                    id="comment-body" rows="5"></textarea>
        </div>
        <button type="submit" class="btn btn-block btn-primary mb-3">Post</button>
      </form>
    </div>

    <ul class="list-unstyled" v-if="article.comments">
      <li v-for="(comment) in article.comments" v-bind:key="comment.id">
        <div class="card">
          <div class="card-body">
            <p class="m-0">
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
      commentBody: '',
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
  },
};
</script>

<style>
</style>
