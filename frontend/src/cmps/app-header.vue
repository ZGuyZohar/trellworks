<template>
  <header>
    <nav>
      <router-link to="/">
        <span role="img" aria-label="logo">TRELLWORKS</span>
      </router-link>
      <router-link to="/boards">Gallery</router-link>
      <router-link to="/board">Board</router-link>
      <router-link to="/login">Login / Signup</router-link>

    </nav>
    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
};
</script>