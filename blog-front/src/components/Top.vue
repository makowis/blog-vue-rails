<template>
  <div class="top">
    <h1>Blog TOP</h1>
    <ul :class="$style.userList">
      <li v-for="(item, key) in users" v-bind:key="key">
        <p>
          {{item.name}}
        </p>
        <p :class="$style.timeLabel">
          {{item.created_at}}
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
      users: [],
    };
  },
  created() {
    this.listen();
  },
  methods: {
    listen() {
      axiosClient.get('/users')
        .then((response) => {
          this.users = response.data;
        });
    },
  },
};
</script>

<style module>
.userList {
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  text-align: left;
  max-width: 90%;
}
.userList li {
  position: relative;
  background-color: white;
  border: 1px solid black;
  padding: 5px 10px;
  margin-bottom: 5px;
}
.userList .timeLabel {
  font-size: smaller;
  text-align: right;
  margin-bottom: 0;
}
</style>
