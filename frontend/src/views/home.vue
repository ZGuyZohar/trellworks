<template>
  <section class="container home text-center">
    <app-header />
    <h1>TRELLWORKS</h1>
    <h5 class="text-center">
      manage your tasks manage your tasks manage your tasks manage your tasks
      manage your tasks manage your tasks
    </h5>
    <h1>
      <router-link to="/board/YhJ2l">Try it now!</router-link>
    </h1>
  </section>
</template>

<script>
import appHeader from "@/cmps/app-header";
import boardHeader from "../cmps/board/board-header.vue";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
  components: {
    appHeader,
    boardHeader,
  },
};
</script>
