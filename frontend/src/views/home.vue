<template>
  <section class="container home text-center">
    <h1>TRELLWORKS</h1>
    <h5 class="text-center">
      Powered up Frontend 
    </h5>
    <h1>
        <router-link to="/board/b101">Board</router-link>
    </h1>
  </section>

  
</template>

<script>
import boardHeader from '../cmps/board/board-header.vue'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  components: { 
    boardHeader
  }
  
}
</script>
