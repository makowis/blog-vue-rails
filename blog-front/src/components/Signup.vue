<template>
  <form class="form-signup" @submit.prevent="signup">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="form-group">
      <label for="name">User Name</label>
      <input v-model="name" type="text"
             class="form-control" id="name" placeholder="user name">
    </div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="email" type="email"
             class="form-control" id="email" placeholder="email@example.com">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password"
             class="form-control" id="password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="password">Password Confirmation</label>
      <input v-model="password_confirmation" type="password"
             class="form-control" id="password_confirmation" placeholder="Password Confirmation">
    </div>
    <button type="submit" class="btn btn-primary mb-3">Sign up</button>
    <div>
      <router-link to="/signin">Sign in</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
    signup() {
      this.$http.plain.post('/signup', { name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error));
    },
    signupSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response);
        return;
      }
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = '';
      this.$router.replace('/');
    },
    signupFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong';
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/');
      }
    },
  },
};
</script>

<style lang="css">
.form-signup {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
}
</style>
