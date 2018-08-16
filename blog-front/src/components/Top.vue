<template>
  <div class="top">
    <h1>Blog TOP</h1>
    <ul :class="$style.articles">
      <li v-for="(item, key) in articles" v-bind:key="key">
        <p>
          {{item.title}}
        </p>
        <p :class="$style.timeLabel">
          {{item.created_at}}
        </p>
        <p :class="$style.userLabel">
          {{item.user.name}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

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
      axiosClient.get('/articles')
        .then((response) => {
          this.articles = response.data;
        });
    },
  },
};
</script>

<style module>
.articles {
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  text-align: left;
  max-width: 90%;
}
.articles li {
  position: relative;
  background-color: white;
  border: 1px solid black;
  padding: 5px 10px;
  margin-bottom: 5px;
}
.articles .timeLabel {
  position: absolute;
  right: 10px;
  top: 0;
  font-size: smaller;
  text-align: right;
  margin-bottom: 0;
}
.articles .userLabel {
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: smaller;
  text-align: right;
  margin-bottom: 0;
}
</style>
