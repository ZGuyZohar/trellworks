<template>
  <div class="flex board-header">
    <div class="flex header-container">
      <h2>{{ boardTitle }}</h2>
      <button class="header-btn star">☆</button>
      <ul class="flex">
        <span class="team-member placeholder"></span>
        <span class="team-member placeholder"></span>
        <span class="team-member placeholder"></span>
      </ul>
      <button class="header-btn">Invite to Board</button>
    </div>
    <button class="header-btn">Show Menu</button>
  </div>
</template>
<script>
export default {
  props: {
    boardTitle: {
      type: String,
      required: true,
    },
  },
};
</script>