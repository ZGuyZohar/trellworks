<template>
  <div class="flex board-header">
    <div class="flex header-container">
      <h2>{{ boardTitle }}</h2>
      <button class="header-btn star"><i class="far fa-star"></i></button>
      <ul class="flex">
        <span class="team-member placeholder"></span>
        <span class="team-member placeholder"></span>
        <span class="team-member placeholder"></span>
      </ul>
      <button class="header-btn">Invite to Board</button>
    </div>
    <button @click="menuShown = !menuShown" class="header-btn">Show Menu</button>
  <boardMenu class ="board-menu" v-if="menuShown"></boardMenu>
  </div>
</template>
<script>
import boardMenu from './menu.vue'
export default {
  props: {
    boardTitle: {
      type: String,
      required: true,
    },
  },
  data(){
    return{
      menuShown: false
    }
  },
  components: {boardMenu}
};
</script>